const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function migrateClustersFixed() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error('MONGODB_URI not found in environment variables');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB for cluster migration');
    
    const db = client.db('vine-content');
    const clustersCollection = db.collection('clusters');
    const contentCollection = db.collection('content');
    
    // Get all clusters that need fixing
    const brokenClusters = await clustersCollection.find({
      $or: [
        { contentIds: { $exists: false } },
        { contentIds: { $size: 0 } },
        { status: 'broken' }
      ]
    }).toArray();
    
    console.log(`Found ${brokenClusters.length} clusters to fix`);
    
    for (const cluster of brokenClusters) {
      // Re-populate content based on cluster criteria
      const matchingContent = await contentCollection.find({
        $or: [
          { tags: { $in: cluster.tags || [] } },
          { category: cluster.category },
          { weight: { $gte: cluster.weightRange?.min || 0, $lte: cluster.weightRange?.max || 100 } }
        ]
      }).toArray();
      
      if (matchingContent.length > 0) {
        await clustersCollection.updateOne(
          { _id: cluster._id },
          {
            $set: {
              contentIds: matchingContent.map(c => c._id),
              count: matchingContent.length,
              status: 'active',
              fixedAt: new Date()
            }
          }
        );
        
        console.log(`Fixed cluster ${cluster.name || cluster._id}: ${matchingContent.length} items`);
      } else {
        // Mark as empty but valid
        await clustersCollection.updateOne(
          { _id: cluster._id },
          {
            $set: {
              contentIds: [],
              count: 0,
              status: 'empty',
              fixedAt: new Date()
            }
          }
        );
        
        console.log(`Marked cluster ${cluster.name || cluster._id} as empty`);
      }
    }

  } catch (error) {
    console.error('Error migrating clusters:', error);
  } finally {
    await client.close();
  }
}

migrateClustersFixed();