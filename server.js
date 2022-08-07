const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

const path = require('path');

const { notes } = require('./db/db.json');

const {
    filterByQuery,

    findById,

    createNewNote,

    validateNote

} = require('./lib/notes');

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, './public/index.html'));

});

app.get('/notes', (req, res) => {

    res.sendFile(path.join(__dirname, './public/notes.html'));

});

app.get('*', (req, res) => {

    res.sendFile(path.join(__dirname, './public/index.html'));

});



// GET routes to return all saved notes as JSON
app.get('/notes', (req, res) => {

    let results = notes;

    if (req, query) {

        results = filterByQuery(req.query, results);

    }

    res.json(results);

});

app.get('/notes/:id', (req, res) => {

    const result = findById(req.params.id, notes);

    if (result) {

        res.json(result);

    } else {

        res.send(404);

    }

});

app.get('/notes', (req, res) => {

    req.body.id = notes.length.toString();

    if (!validateNote(req.body)) {

        res.status(400).send('The note is not properly formatted.');

    } else {

        const note = createNewNote(req.body, notes);

        res.json(note);

    }

});


app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static('public'));


app.listen(PORT, () => {

    console.log(`API server now on port ${PORT}!`);

});