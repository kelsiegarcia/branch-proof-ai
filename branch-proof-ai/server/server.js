const express = require('express');
const cors = require('cors');


require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/people', require('./routes/people'));
app.use('/api/relationships', require('./routes/relationships'));
app.use('/api/records', require('./routes/records'));

// Health check
app.get('/', (req, res) => res.json({ status: 'TreeProof API running' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));