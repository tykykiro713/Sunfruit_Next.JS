import { MongoClient } from 'mongodb';

async function fixContent() {
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect();
  
  const db = client.db('ecommerce-shop');
  const contentCollection = db.collection('content');
  
  // Find existing weight-management content
  const existingContent = await contentCollection.findOne({
    $or: [
      { topic_id: 'weight-management-beverages' },
      { topic_id: '686e8fca040c54cb628a9603' },
      { _id: 'weight-management-beverages-content' }
    ]
  });
  
  console.log('Existing content:', existingContent ? 'Found' : 'Not found');
  if (existingContent) {
    console.log('Content topic_id:', existingContent.topic_id);
    console.log('Content length:', existingContent.content?.length || 0);
    console.log('Content preview:', existingContent.content?.substring(0, 200) + '...');
  }
  
  await client.close();
}

fixContent().catch(console.error);