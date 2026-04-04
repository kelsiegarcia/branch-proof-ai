const express = require('express');
const router = express.Router();
const Person = require('../models/person');

let people = [
	{ id: '1', name: 'John Doe' },
	{ id: '2', name: 'Jane Smith' }
];
let nextId = 1;

router.get('/', async (req, res) => {
	const people = await Person.find();
	res.json(people);
});

router.get('/:id', async (req, res) => {
	const person = await Person.findById(req.params.id);
	person ? res.json(person) : res.status(404).json({ error: 'Not found' });
});

router.post('/', async (req, res) => {
	const newPerson = new Person({
		name: req.body.name
	});

	const savedPerson = await newPerson.save();
	res.status(201).json(savedPerson);
});

router.put('/:id', async (req, res) => {
	try {
		const updatedPerson = await Person.findByIdAndUpdate(
			req.params.id,
			{ name: req.body.name },
			{ new: true }
		);

		if (!updatedPerson) {
			return res.status(404).json({ message: 'Person not found' });
		}

		res.status(200).json(updatedPerson);
	} catch (error) {
		res.status(500).json({ message: 'Error updating person', error });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const deletedPerson = await Person.findByIdAndDelete(req.params.id);
		if (!deletedPerson) {
			return res.status(404).json({ message: 'Person not found' });
		}
		res.status(200).json({ message: 'Person deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: 'Error deleting person', error });
	}
});
module.exports = router;