const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

async function migrateClusterPages() {
  const uri = "mongodb+srv://tyson:vinepass123@sunfruit-vine-content.fg1i4k5.mongodb.net/?retryWrites=true&w=majority&appName=sunfruit-vine-content";
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db('vine_content');
    const contentCollection = db.collection('content');
    
    // List of cluster pages to migrate
    const clusterPages = [
      {
        file: 'sugar-free-alternatives',
        topic_id: 'diabetic-beverages-sugar-alternatives'
      },
      {
        file: 'reading-beverage-labels',
        topic_id: 'diabetic-beverages-reading-labels'
      },
      {
        file: 'homemade-diabetic-drinks',
        topic_id: 'diabetic-beverages-homemade-drinks'
      },
      {
        file: 'coffee-tea-diabetes',
        topic_id: 'diabetic-beverages-coffee-tea'
      },
      {
        file: 'smoothies-diabetics',
        topic_id: 'diabetic-beverages-smoothies'
      }
    ];
    
    for (const page of clusterPages) {
      const filePath = path.join(__dirname, 'src/app/vine/diabetic-beverages', page.file, 'page.tsx');
      console.log(`Processing: ${page.file}`);
      
      try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        // Extract the content HTML string from the template literal
        const contentStart = fileContent.indexOf('content: `');
        const contentEnd = fileContent.indexOf('`,', contentStart);
        
        if (contentStart === -1 || contentEnd === -1) {
          console.log(`No content found in ${page.file}`);
          continue;
        }
        
        const htmlContent = fileContent.substring(contentStart + 10, contentEnd).trim();
        
        // Extract title and meta description
        const titleMatch = fileContent.match(/title: "([^"]*?)"/);
        const metaMatch = fileContent.match(/meta_description: "([^"]*?)"/);
        
        const title = titleMatch ? titleMatch[1] : '';
        const metaDescription = metaMatch ? metaMatch[1] : '';
        
        console.log(`- Title: ${title}`);
        console.log(`- Content length: ${htmlContent.length} chars`);
        
        // Check if content already exists
        const existing = await contentCollection.findOne({ topic_id: page.topic_id });
        
        if (existing) {
          console.log(`- Content already exists, updating...`);
          await contentCollection.updateOne(
            { topic_id: page.topic_id },
            { 
              $set: {
                title: title,
                meta_description: metaDescription,
                content: htmlContent,
                word_count: htmlContent.split(' ').length,
                last_updated: new Date(),
                source: 'migrated_from_static'
              }
            }
          );
        } else {
          console.log(`- Creating new content...`);
          await contentCollection.insertOne({
            topic_id: page.topic_id,
            title: title,
            meta_description: metaDescription,
            content: htmlContent,
            word_count: htmlContent.split(' ').length,
            created_at: new Date(),
            last_updated: new Date(),
            source: 'migrated_from_static'
          });
        }
        
        console.log(`✅ ${page.file} migrated successfully\n`);
        
      } catch (error) {
        console.error(`Error processing ${page.file}:`, error.message);
      }
    }
    
    // Verify migration
    console.log('\n=== MIGRATION VERIFICATION ===');
    const allContent = await contentCollection.find({}).toArray();
    allContent.forEach(doc => {
      console.log(`✓ ${doc.topic_id}: ${doc.content?.length || 0} chars`);
    });
    
    console.log('\n🚀 Migration complete! All cluster pages now in MongoDB.');
    
  } finally {
    await client.close();
  }
}

migrateClusterPages().catch(console.error);