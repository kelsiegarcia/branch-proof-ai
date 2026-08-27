const express = require('express');
const router = express.Router();
const Relationship = require('../models/relationship');

router.get('/', async (req, res) => {
	const relationships = await Relationship.find();
	res.json(relationships);
});

router.get('/:id', async (req, res) => {
	const item = await Relationship.findById(req.params.id);
	item ? res.json(item) : res.status(404).json({ error: 'Not found' });
});

router.post('/', async (req, res) => {
	const newRelationship = new Relationship({
		name: req.body.name
	});

	const saved = await newRelationship.save();
	res.status(201).json(saved);
});

router.put('/:id', async (req, res) => {
	const updated = await Relationship.findByIdAndUpdate(
		req.params.id,
		{ name: req.body.name },
		{ new: true }
	);

	res.json(updated);
});

router.delete('/:id', async (req, res) => {
	await Relationship.findByIdAndDelete(req.params.id);
	res.json({ message: 'Deleted' });
});

module.exports = router;
