import fetch from 'node-fetch';

async function testApi() {
  try {
    const response = await fetch('http://localhost:3000/api/users');
    const data = await response.json();
    console.log('API Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

testApi();
