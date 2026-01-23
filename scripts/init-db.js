const path = require('path');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('❌ Missing MONGODB_URI in .env.local');
  process.exit(1);
}

async function initDatabase() {
  const client = new MongoClient(uri);
  
  try {
    console.log('🔌 Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas');
    
    const db = client.db();
    console.log(`📦 Database: ${db.databaseName}`);
    
    // Create collections if they don't exist
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    console.log('\n📚 Creating collections and indexes...\n');
    
    // Users collection
    if (!collectionNames.includes('users')) {
      await db.createCollection('users');
      console.log('  ✓ Created collection: users');
    } else {
      console.log('  ℹ Collection already exists: users');
    }
    
    // Create unique index on email
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    console.log('  ✓ Index created: users.email (unique)');
    
    // Create index on id
    await db.collection('users').createIndex({ id: 1 }, { unique: true });
    console.log('  ✓ Index created: users.id (unique)');
    
    // Diagnostics collection
    if (!collectionNames.includes('diagnostics')) {
      await db.createCollection('diagnostics');
      console.log('  ✓ Created collection: diagnostics');
    } else {
      console.log('  ℹ Collection already exists: diagnostics');
    }
    
    // Create compound unique index on userId + mode (one diagnostic per user per mode)
    await db.collection('diagnostics').createIndex(
      { userId: 1, mode: 1 },
      { unique: true }
    );
    console.log('  ✓ Index created: diagnostics.userId + mode (unique compound)');
    
    // Create index on attemptId for quick lookups
    await db.collection('diagnostics').createIndex({ attemptId: 1 });
    console.log('  ✓ Index created: diagnostics.attemptId');
    
    // Create index on updatedAt for sorting
    await db.collection('diagnostics').createIndex({ updatedAt: -1 });
    console.log('  ✓ Index created: diagnostics.updatedAt (descending)');
    
    // Sessions collection (optional, for future use)
    if (!collectionNames.includes('sessions')) {
      await db.createCollection('sessions');
      console.log('  ✓ Created collection: sessions');
    } else {
      console.log('  ℹ Collection already exists: sessions');
    }
    
    // Create index on session token and expiry
    await db.collection('sessions').createIndex({ token: 1 }, { unique: true });
    console.log('  ✓ Index created: sessions.token (unique)');
    
    await db.collection('sessions').createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
    console.log('  ✓ Index created: sessions.expiresAt (TTL)');
    
    console.log('\n✅ Database initialization complete!');
    console.log(`\n📊 Database: ${db.databaseName}`);
    console.log(`📁 Collections: users, diagnostics, sessions`);
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exitCode = 1;
  } finally {
    await client.close();
    console.log('\n🔌 Connection closed');
  }
}

initDatabase();
