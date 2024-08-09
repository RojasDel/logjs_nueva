const axios = require('axios'); // Con modulo axios hacemos solicitudes http (POST)

async function sendLog(log) { // Esta funcion toma el parametro log
  try { // manejo de errores durante axios post
    const response = await axios.post('http://localhost:3000/logs', log);
    console.log('Log sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending log:', error.response ? error.response.data : error.message);
  }
}

const logs = [
  {
    timestamp: '2024-08-07T12:34:56.789Z',
    serviceName: 'ServiceA',
    severity: 'info',
    message: 'This is a log message from ServiceA',
  },
  {
    timestamp: '2024-08-07T12:35:56.789Z',
    serviceName: 'ServiceB',
    severity: 'error',
    message: 'This is an error message from ServiceB',
  },
  {
    timestamp: '2024-08-07T12:36:56.789Z',
    serviceName: 'ServiceC',
    severity: 'debug',
    message: 'This is a debug message from ServiceC',
  },
];

logs.forEach(sendLog);
