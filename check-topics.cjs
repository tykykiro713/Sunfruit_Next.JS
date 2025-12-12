const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function checkTopics() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error('MONGODB_URI not found in environment variables');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB for topic checking');
    
    const db = client.db('vine-content');
    const collection = db.collection('topics');
    
    const topics = await collection.find({}).toArray();
    console.log(`Found ${topics.length} topics`);
    
    topics.forEach(topic => {
      console.log(`- ${topic.name}: ${topic.weight || 0} weight`);
    });

  } catch (error) {
    console.error('Error checking topics:', error);
  } finally {
    await client.close();
  }
}

checkTopics();