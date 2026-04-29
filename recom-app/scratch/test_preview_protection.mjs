import fetch from 'node-fetch';

async function testPreviewProtection() {
  const url = 'http://localhost:3000/admin/preview/home';
  console.log(`Checking ${url} for protection...`);
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'manual'
    });
    
    console.log(`Status: ${response.status}`);
    const location = response.headers.get('location');
    console.log(`Location: ${location}`);
    
    if (response.status === 307 || response.status === 302 || response.status === 303) {
      if (location && location.includes('/login')) {
        console.log('SUCCESS: Anonymous access redirected to login.');
      } else {
        console.log('WARNING: Redirected but not to login.');
      }
    } else {
      console.log('FAILURE: Anonymous access not blocked or redirected unexpectedly.');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testPreviewProtection();
