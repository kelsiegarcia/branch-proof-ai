const express = require('express');
const router = express.Router();
const Record = require('../models/record');

let records = [
	{
		id: '123',
		title: 'Birth Certificate',
		description: 'John Doe birth record',
		person: 'John Doe'
	}
];
let nextId = 1;

router.get('/', async (req, res) => {
	const records = await Record.find();
	res.json(records);
});

router.post('/', async (req, res) => {
	const newRecord = new Record({
		title: req.body.title,
		description: req.body.description,
		person: req.body.person
	});

	const savedRecord = await newRecord.save();
	res.status(201).json(savedRecord);
});

router.put('/:id', async (req, res) => {
	const updatedRecord = await Record.findByIdAndUpdate(
		req.params.id,
		{
			title: req.body.title,
			description: req.body.description,
			person: req.body.person
		},
		{ new: true }
	);

	if (!updatedRecord) {
		return res.status(404).json({ message: 'Record not found' });
	}

	res.status(200).json(updatedRecord);
});

router.delete('/:id', async (req, res) => {
	const deletedRecord = await Record.findByIdAndDelete(req.params.id);

	if (!deletedRecord) {
		return res.status(404).json({ message: 'Record not found' });
	}

	res.status(200).json({ message: 'Record deleted successfully' });
});

module.exports = router;