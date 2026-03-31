const express = require('express');
const router = express.Router();

let records = [
	{
		id: '123',
		title: 'Birth Certificate',
		description: 'John Doe birth record',
		person: 'John Doe'
	}
];
let nextId = 1;

router.get('/', (req, res) => res.json(records));

router.get('/:id', (req, res) => {
	const item = records.find(p => p.id == req.params.id);
	item ? res.json(item) : res.status(404).json({ error: 'Not found' });
});

router.post('/', (req, res) => {
	const item = { id: nextId++, ...req.body };
	records.push(item);
	res.status(201).json(item);
});

router.put('/:id', (req, res) => {
	const i = records.findIndex(p => p.id == req.params.id);
	if (i === -1) return res.status(404).json({ error: 'Not found' });
	records[i] = { ...records[i], ...req.body };
	res.json(records[i]);
});

router.delete('/:id', (req, res) => {
	records = records.filter(p => p.id != req.params.id);
	res.json({ message: 'Deleted' });
});

module.exports = router;