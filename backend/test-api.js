const axios = require('axios');
require('dotenv').config();

const API_URL = 'http://localhost:5000/api';

async function testAuthFlow() {
  try {
    console.log('Testing authentication flow...\n');
    
    // Try login with existing student
    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      email: 'psrinath821@gmail.com',
      password: 'test123' // We don't know the actual password
    }).catch(err => {
      console.log('Login failed (expected if password wrong)');
      console.log('Response:', err.response?.data?.message);
      return null;
    });
    
    if (!loginRes) {
      console.log('\n❌ Could not login. The users were created with auto-generated passwords.');
      console.log('Trying to test API without token...\n');
    } else {
      const token = loginRes.data.data.token;
      console.log('✅ Logged in successfully');
      console.log(`Token: ${token.substring(0, 20)}...`);
      
      // Test GET /students with token
      const studentsRes = await axios.get(`${API_URL}/students`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Students fetched:', studentsRes.data.count);
      return;
    }
    
    // Check what endpoints are accessible
    console.log('Testing GET /students without auth...');
    await axios.get(`${API_URL}/students`).catch(err => {
      console.log(`Status: ${err.response?.status}`);
      console.log(`Message: ${err.response?.data?.message}`);
    });
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAuthFlow();
