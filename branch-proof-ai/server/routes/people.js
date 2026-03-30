const express = require('express');
const router = express.Router();

let people = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' }
];
let nextId = 1;

router.get('/', (req, res) => res.json(people));

router.get('/:id', (req, res) => {
    const item = people.find(p => p.id == req.params.id);
    item ? res.json(item) : res.status(404).json({ error: 'Not found' });
});

router.post('/', (req, res, next) => {
    const newPerson = {
        id: Date.now().toString(),
        name: req.body.name
    };

    people.push(newPerson);
    res.status(201).json(newPerson);
});

router.put('/:id', (req, res) => {
    const i = people.findIndex(p => p.id == req.params.id);
    if (i === -1) return res.status(404).json({ error: 'Not found' });
    people[i] = { ...people[i], ...req.body };
    res.json(people[i]);
});

router.delete('/:id', (req, res) => {
    people = people.filter(person => person.id !== req.params.id);
    res.status(200).json({ message: 'Person deleted successfully' });
});
module.exports = router;