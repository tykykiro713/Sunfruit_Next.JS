// Test script for Vine API integration
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function testVineAPI() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error('MONGODB_URI not found in environment variables');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Successfully connected to MongoDB');
    
    // Test database operations
    const db = client.db('vine-content');
    const collections = await db.listCollections().toArray();
    console.log('📁 Available collections:', collections.map(c => c.name));

    // Test a simple query
    const contentCollection = db.collection('content');
    const count = await contentCollection.countDocuments();
    console.log(`📊 Total documents in content collection: ${count}`);

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
  } finally {
    await client.close();
  }
}

testVineAPI();