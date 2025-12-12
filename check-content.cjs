const { MongoClient } = require('mongodb');

async function checkAllContent() {
  const uri = "mongodb+srv://tyson:vinepass123@sunfruit-vine-content.fg1i4k5.mongodb.net/?retryWrites=true&w=majority&appName=sunfruit-vine-content";
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db('vine_content');
    const contentCollection = db.collection('content');
    
    // List all content
    const allContent = await contentCollection.find({}).toArray();
    console.log('All content records:');
    allContent.forEach(doc => {
      console.log(`- ${doc.topic_id}: ${doc.content?.length || 0} chars`);
    });
    
  } finally {
    await client.close();
  }
}

checkAllContent().catch(console.error);