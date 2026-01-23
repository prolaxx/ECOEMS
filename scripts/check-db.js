const path = require('path');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('Missing MONGODB_URI');
  process.exit(1);
}

console.log('Metodo: MongoDB Atlas + Ping');
console.log('Variables usadas: MONGODB_URI');

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    await client.db().admin().ping();
    console.log('Mongo OK / Ping OK');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Mongo FAIL: ${message}`);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

run();
