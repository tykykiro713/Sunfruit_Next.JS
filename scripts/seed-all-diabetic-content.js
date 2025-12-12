// Combined MongoDB Seed Script for Diabetic Beverages Content
// This script populates both pillar and cluster content

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seedAllContent() {
  try {
    console.log('Starting complete diabetic beverages content seeding...\n');
    
    // Run pillar seeding
    console.log('1. Seeding pillar page and topics...');
    execSync('node ' + path.join(__dirname, 'seed-diabetic-beverages.js'), { stdio: 'inherit' });
    
    // Run cluster content seeding
    console.log('\n2. Seeding cluster content...');
    execSync('node ' + path.join(__dirname, 'seed-diabetic-beverages-clusters.js'), { stdio: 'inherit' });
    
    console.log('\n✅ All diabetic beverages content seeded successfully!');
    console.log('\nYou can now access:');
    console.log('- Pillar page: http://localhost:3000/vine/diabetic-beverages');
    console.log('- Reading labels: http://localhost:3000/vine/diabetic-beverages/reading-beverage-labels');
    console.log('- Sugar alternatives: http://localhost:3000/vine/diabetic-beverages/sugar-free-alternatives');
    console.log('- Homemade drinks: http://localhost:3000/vine/diabetic-beverages/homemade-diabetic-drinks');
    console.log('- Coffee & tea: http://localhost:3000/vine/diabetic-beverages/coffee-tea-diabetes');
    console.log('- Smoothies: http://localhost:3000/vine/diabetic-beverages/smoothies-diabetics');
    
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
}

// Run the combined seeding
seedAllContent();