import { MongoClient, MongoClientOptions } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error(
    'Missing MONGODB_URI environment variable. Please add it to .env.local'
  );
}

const options: MongoClientOptions = {
  maxPoolSize: 10,
  minPoolSize: 5,
  maxIdleTimeMS: 30000,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Handle connection errors
clientPromise.catch((error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});

export { clientPromise };
export default clientPromise;
