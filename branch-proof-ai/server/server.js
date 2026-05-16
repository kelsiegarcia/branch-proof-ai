const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');


require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/people', require('./routes/people'));
app.use('/api/relationships', require('./routes/relationships'));
app.use('/api/records', require('./routes/records'));
app.use('/api/validation', require('./routes/validation'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Health check
app.get('/', (req, res) => res.json({ status: 'TreeProof API running' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/branch-proof-ai')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));