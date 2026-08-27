const mongoose = require('mongoose');
require('dotenv').config();

const Person = require('./models/person');
const Relationship = require('./models/relationship');
const Record = require('./models/record');

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/branch-proof-ai';

mongoose.connect(mongoUri)
  .then(async () => {
    console.log('Connected to MongoDB for seeding');

    await Person.deleteMany({});
    await Relationship.deleteMany({});
    await Record.deleteMany({});

    const people = await Person.insertMany([
      { name: 'John Doe' },
      { name: 'Jane Doe' },
      { name: 'Mary Smith' }
    ]);

    await Relationship.insertMany([
      { name: 'John Doe parent of Jane Doe' },
      { name: 'Mary Smith spouse of John Doe' }
    ]);

    await Record.insertMany([
      {
        title: 'Birth Certificate',
        description: 'Jane Doe birth record',
        person: 'Jane Doe'
      },
      {
        title: 'Marriage Record',
        description: 'John Doe marriage record',
        person: 'John Doe'
      },
      {
        title: 'Census Record',
        description: 'Mary Smith census record',
        person: 'Mary Smith'
      }
    ]);

    console.log('Database seeded successfully');
    console.log('People seeded:', people.length);

    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Seeding error:', error);
    mongoose.connection.close();
  });
