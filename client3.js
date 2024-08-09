const axios = require('axios');

async function sendLog() {
  const log = {
    timestamp: new Date().toISOString(),
    serviceName: 'ServiceC',
    severity: 'debug',
    message: 'Client 3: This is a debug message from ServiceC',
  };

  try {
    const response = await axios.post('http://localhost:3000/logs', log);
    console.log('Client 3 Log sent successfully:', response.data);
  } catch (error) {
    console.error('Client 3 Error sending log:', error.response ? error.response.data : error.message);
  }
}

sendLog();
