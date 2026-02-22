require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  console.log('Checking database...\n');
  
  const allUsers = await User.find().select('email name role').limit(10);
  console.log('Total users:', await User.countDocuments());
  console.log('Users in DB:');
  allUsers.forEach(u => console.log(`  - ${u.email} (${u.role})`));
  
  const students = await User.countDocuments({ role: 'student' });
  const admins = await User.countDocuments({ role: 'admin' });
  console.log(`\nSummary: ${students} students, ${admins} admins`);
  
  process.exit(0);
}).catch(e => { 
  console.error('DB Error:', e.message); 
  process.exit(1); 
});
