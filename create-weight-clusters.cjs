const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function createWeightClusters() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error('MONGODB_URI not found in environment variables');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB for weight clustering');
    
    const db = client.db('vine-content');
    const contentCollection = db.collection('content');
    const clustersCollection = db.collection('weight-clusters');
    
    // Get all content with weights
    const contentWithWeights = await contentCollection.find({
      weight: { $exists: true, $ne: null }
    }).toArray();
    
    // Create weight-based clusters
    const weightRanges = [
      { min: 0, max: 25, label: 'light' },
      { min: 26, max: 50, label: 'medium' },
      { min: 51, max: 75, label: 'heavy' },
      { min: 76, max: 100, label: 'extra-heavy' }
    ];
    
    for (const range of weightRanges) {
      const clusterContent = contentWithWeights.filter(
        content => content.weight >= range.min && content.weight <= range.max
      );
      
      if (clusterContent.length > 0) {
        await clustersCollection.updateOne(
          { label: range.label },
          {
            $set: {
              label: range.label,
              weightRange: { min: range.min, max: range.max },
              contentIds: clusterContent.map(c => c._id),
              count: clusterContent.length,
              updatedAt: new Date()
            }
          },
          { upsert: true }
        );
        
        console.log(`Created ${range.label} cluster with ${clusterContent.length} items`);
      }
    }

  } catch (error) {
    console.error('Error creating weight clusters:', error);
  } finally {
    await client.close();
  }
}

createWeightClusters();