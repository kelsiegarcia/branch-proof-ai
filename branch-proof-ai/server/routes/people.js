const express = require('express');
const router = express.Router();

let people = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
];
let nextId = 1;

router.get('/', (req, res) => res.json(people));

router.get('/:id', (req, res) => {
    const item = people.find(p => p.id == req.params.id);
    item ? res.json(item) : res.status(404).json({ error: 'Not found' });
});

router.post('/', (req, res) => {
    const item = { id: nextId++, ...req.body };
    people.push(item);
    res.status(201).json(item);
});

router.put('/:id', (req, res) => {
    const i = people.findIndex(p => p.id == req.params.id);
    if (i === -1) return res.status(404).json({ error: 'Not found' });
    people[i] = { ...people[i], ...req.body };
    res.json(people[i]);
});

router.delete('/:id', (req, res) => {
    people = people.filter(p => p.id != req.params.id);
    res.json({ message: 'Deleted' });
});

module.exports = router;