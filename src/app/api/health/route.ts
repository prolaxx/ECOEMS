import { NextResponse } from 'next/server';
import { getMongoClient } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = await getMongoClient();
    const db = client.db();
    
    // Test database connection with ping
    await db.admin().ping();
    
    // Get database stats
    const stats = await db.stats();
    
    return NextResponse.json({
      status: 'ok',
      database: {
        connected: true,
        name: db.databaseName,
        collections: stats.collections,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      {
        status: 'error',
        database: {
          connected: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
