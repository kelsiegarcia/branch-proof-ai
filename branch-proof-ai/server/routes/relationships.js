const express = require('express');
const router = express.Router();

let relationships = [];
let nextId = 1;

router.get('/', (req, res) => res.json(relationships));

router.get('/:id', (req, res) => {
    const item = relationships.find(p => p.id == req.params.id);
    item ? res.json(item) : res.status(404).json({ error: 'Not found' });
});

router.post('/', (req, res) => {
    const item = { id: nextId++, ...req.body };
    relationships.push(item);
    res.status(201).json(item);
});

router.put('/:id', (req, res) => {
    const i = relationships.findIndex(p => p.id == req.params.id);
    if (i === -1) return res.status(404).json({ error: 'Not found' });
    relationships[i] = { ...relationships[i], ...req.body };
    res.json(relationships[i]);
});

router.delete('/:id', (req, res) => {
    relationships = relationships.filter(p => p.id != req.params.id);
    res.json({ message: 'Deleted' });
});

module.exports = router;