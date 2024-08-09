const axios = require('axios');

async function sendLog() {
  const log = {
    timestamp: new Date().toISOString(),
    serviceName: 'ServiceA',
    severity: 'info',
    message: 'Client 1: This is a log message from ServiceA',
  };

  try {
    const response = await axios.post('http://localhost:3000/logs', log);
    console.log('Client 1 Log sent successfully:', response.data);
  } catch (error) {
    console.error('Client 1 Error sending log:', error.response ? error.response.data : error.message);
  }
}

sendLog();
