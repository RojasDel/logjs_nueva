const axios = require('axios');

async function sendLog() {
  const log = {
    timestamp: new Date().toISOString(),
    serviceName: 'ServiceB',
    severity: 'error',
    message: 'Client 2: This is an error message from ServiceB',
  };

  try {
    const response = await axios.post('http://localhost:3000/logs', log);
    console.log('Client 2 Log sent successfully:', response.data);
  } catch (error) {
    console.error('Client 2 Error sending log:', error.response ? error.response.data : error.message);
  }
}

sendLog();
