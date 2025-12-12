const { MongoClient } = require('mongodb');

async function fixWeightManagementContent() {
  const uri = "mongodb+srv://tyson:vinepass123@sunfruit-vine-content.fg1i4k5.mongodb.net/?retryWrites=true&w=majority&appName=sunfruit-vine-content";
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db('vine_content');
    const contentCollection = db.collection('content');
    
    // Get current content
    const current = await contentCollection.findOne({ topic_id: 'weight-management-beverages' });
    console.log('Current content found:', !!current);
    console.log('Content length:', current?.content?.length || 0);
    console.log('First 200 chars:', current?.content?.substring(0, 200) || 'No content');
    
    // Get diabetic beverages content for reference
    const reference = await contentCollection.findOne({ topic_id: 'diabetic-beverages-pillar' });
    console.log('\nReference content found:', !!reference);
    console.log('Reference length:', reference?.content?.length || 0);
    
  } finally {
    await client.close();
  }
}

fixWeightManagementContent().catch(console.error);