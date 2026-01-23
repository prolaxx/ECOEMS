const path = require('path');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('❌ Missing MONGODB_URI in .env.local');
  process.exit(1);
}

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0];

function showHelp() {
  console.log(`
📋 Admin Users Management

Usage:
  node scripts/admin-users.js <command> [options]

Commands:
  list                    List all users
  create <email> [name]   Create a new user (or get existing)
  find <email>            Find user by email
  delete <email>          Delete user and their diagnostics
  stats                   Show database statistics
  admin <email>           Mark user as admin (adds isAdmin flag)

Examples:
  node scripts/admin-users.js list
  node scripts/admin-users.js create admin@example.com "Admin User"
  node scripts/admin-users.js find user@example.com
  node scripts/admin-users.js admin admin@example.com
  node scripts/admin-users.js stats
`);
}

async function listUsers(db) {
  const users = db.collection('users');
  const allUsers = await users.find({}).sort({ createdAt: -1 }).toArray();
  
  console.log(`\n👥 Total users: ${allUsers.length}\n`);
  
  if (allUsers.length === 0) {
    console.log('No users found.');
    return;
  }
  
  allUsers.forEach((user, index) => {
    const adminBadge = user.isAdmin ? '👑 ' : '';
    console.log(`${index + 1}. ${adminBadge}${user.email}`);
    console.log(`   ID: ${user.id}`);
    console.log(`   Name: ${user.user_metadata?.full_name || 'N/A'}`);
    console.log(`   Created: ${user.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A'}`);
    console.log(`   Last Login: ${user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}`);
    console.log('');
  });
}

async function createUser(db, email, name) {
  const users = db.collection('users');
  
  // Check if user exists
  const existing = await users.findOne({ email });
  if (existing) {
    console.log(`\n⚠️  User already exists: ${email}`);
    console.log(`   ID: ${existing.id}`);
    return;
  }
  
  // Generate ID
  const userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
  
  const newUser = {
    id: userId,
    email,
    user_metadata: {
      full_name: name || email.split('@')[0]
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  await users.insertOne(newUser);
  console.log(`\n✅ User created successfully!`);
  console.log(`   Email: ${email}`);
  console.log(`   ID: ${userId}`);
  console.log(`   Name: ${newUser.user_metadata.full_name}`);
}

async function findUser(db, email) {
  const users = db.collection('users');
  const diagnostics = db.collection('diagnostics');
  
  const user = await users.findOne({ email });
  if (!user) {
    console.log(`\n❌ User not found: ${email}`);
    return;
  }
  
  // Get user's diagnostics
  const userDiagnostics = await diagnostics.find({ userId: user.id }).toArray();
  
  console.log(`\n👤 User Details:`);
  console.log(`   Email: ${user.email}`);
  console.log(`   ID: ${user.id}`);
  console.log(`   Name: ${user.user_metadata?.full_name || 'N/A'}`);
  console.log(`   Admin: ${user.isAdmin ? 'Yes 👑' : 'No'}`);
  console.log(`   Created: ${user.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A'}`);
  console.log(`   Last Login: ${user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}`);
  console.log(`\n📊 Diagnostics: ${userDiagnostics.length}`);
  
  userDiagnostics.forEach((diag, index) => {
    console.log(`   ${index + 1}. Mode: ${diag.mode}`);
    console.log(`      Score: ${diag.results?.percent || 0}% (${diag.results?.totalCorrect || 0}/${diag.results?.totalQuestions || 0})`);
    console.log(`      Completed: ${diag.updatedAt ? new Date(diag.updatedAt).toLocaleString() : 'N/A'}`);
  });
}

async function deleteUser(db, email) {
  const users = db.collection('users');
  const diagnostics = db.collection('diagnostics');
  
  const user = await users.findOne({ email });
  if (!user) {
    console.log(`\n❌ User not found: ${email}`);
    return;
  }
  
  // Delete diagnostics first
  const diagResult = await diagnostics.deleteMany({ userId: user.id });
  
  // Delete user
  await users.deleteOne({ email });
  
  console.log(`\n✅ User deleted successfully!`);
  console.log(`   Email: ${email}`);
  console.log(`   Diagnostics deleted: ${diagResult.deletedCount}`);
}

async function makeAdmin(db, email) {
  const users = db.collection('users');
  
  const user = await users.findOne({ email });
  if (!user) {
    console.log(`\n❌ User not found: ${email}`);
    return;
  }
  
  await users.updateOne(
    { email },
    { $set: { isAdmin: true, updatedAt: new Date() } }
  );
  
  console.log(`\n✅ User marked as admin!`);
  console.log(`   Email: ${email}`);
  console.log(`   ID: ${user.id}`);
}

async function showStats(db) {
  const users = db.collection('users');
  const diagnostics = db.collection('diagnostics');
  
  const userCount = await users.countDocuments();
  const diagCount = await diagnostics.countDocuments();
  const admins = await users.countDocuments({ isAdmin: true });
  
  // Get recent activity
  const recentUsers = await users.find({}).sort({ createdAt: -1 }).limit(5).toArray();
  const recentDiags = await diagnostics.find({}).sort({ updatedAt: -1 }).limit(5).toArray();
  
  console.log(`\n📊 Database Statistics\n`);
  console.log(`👥 Users: ${userCount}`);
  console.log(`👑 Admins: ${admins}`);
  console.log(`📋 Diagnostics: ${diagCount}`);
  console.log(`📈 Avg diagnostics per user: ${userCount > 0 ? (diagCount / userCount).toFixed(2) : 0}`);
  
  console.log(`\n🆕 Recent Users (last 5):`);
  recentUsers.forEach((user, i) => {
    console.log(`   ${i + 1}. ${user.email} - ${user.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A'}`);
  });
  
  console.log(`\n📝 Recent Diagnostics (last 5):`);
  recentDiags.forEach((diag, i) => {
    console.log(`   ${i + 1}. User: ${diag.userId.substring(0, 20)}... - Score: ${diag.results?.percent || 0}%`);
  });
}

async function run() {
  if (!command || command === 'help' || command === '--help' || command === '-h') {
    showHelp();
    process.exit(0);
  }
  
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db();
    
    switch (command) {
      case 'list':
        await listUsers(db);
        break;
      
      case 'create':
        if (!args[1]) {
          console.error('❌ Email is required for create command');
          process.exit(1);
        }
        await createUser(db, args[1], args[2]);
        break;
      
      case 'find':
        if (!args[1]) {
          console.error('❌ Email is required for find command');
          process.exit(1);
        }
        await findUser(db, args[1]);
        break;
      
      case 'delete':
        if (!args[1]) {
          console.error('❌ Email is required for delete command');
          process.exit(1);
        }
        await deleteUser(db, args[1]);
        break;
      
      case 'admin':
        if (!args[1]) {
          console.error('❌ Email is required for admin command');
          process.exit(1);
        }
        await makeAdmin(db, args[1]);
        break;
      
      case 'stats':
        await showStats(db);
        break;
      
      default:
        console.error(`❌ Unknown command: ${command}`);
        showHelp();
        process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

run();
