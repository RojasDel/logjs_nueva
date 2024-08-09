const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const app = express();

// Configuración de la base de datos SQLite
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'sqlite',
  logging: false,
});

// Definición del modelo `Log`
const Log = sequelize.define('Log', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  timestamp: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  serviceName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  severity: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is working!');
});

function validateLog(log) {
  if (!log) {
    throw new Error('Log is required');
  }
  const { timestamp, serviceName, severity, message } = log;
  if (!timestamp || isNaN(new Date(timestamp).getTime())) {
    throw new Error('Valid timestamp is required');
  }
  if (!serviceName) {
    throw new Error('Service name is required');
  }
  if (!severity || !['info', 'error', 'debug'].includes(severity.toLowerCase())) {
    throw new Error('Valid severity level is required (info, error, debug)');
  }
  if (!message) {
    throw new Error('Descriptive message is required');
  }
}

app.post('/logs', async (req, res) => {
  try {
    const log = req.body;
    validateLog(log);
    const { timestamp, serviceName, severity, message } = log;

    const newLog = await Log.create({
      timestamp: new Date(timestamp),
      serviceName,
      severity,
      message,
    });

    res.status(201).json(newLog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/logs', async (req, res) => {
  try {
    const logs = await Log.findAll();
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving logs' });
  }
});

sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
});
