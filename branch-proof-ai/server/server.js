const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const allowedOrigins = (process.env.CLIENT_ORIGINS || 'http://localhost:4200')
  .split(',')
  .map((origin) => origin.trim());

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Origin is not allowed by CORS'));
  },
}));
app.use(express.json({ limit: '100kb' }));

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BranchProofAI API',
      version: '1.0.0',
      description: 'API documentation for the BranchProofAI genealogy validation application',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./server/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
// Routes
app.use('/api/people', require('./routes/people'));
app.use('/api/relationships', require('./routes/relationships'));
app.use('/api/records', require('./routes/records'));
app.use('/api/validation', require('./routes/validation'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Health check
app.get('/', (req, res) => res.json({ status: 'BranchProofAI API running' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/branch-proof-ai';

mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));
