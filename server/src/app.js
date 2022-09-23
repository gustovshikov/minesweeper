const { getAllScores, postScore } = require('./controllers.js');

const cors = require('cors');
const express = require('express');
const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('My API is up and running Yo!');
});

app.get('/scores', (req, res) => {
  getAllScores()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

app.post('/scores/:name', (req, res) => {
  postScore(req.body)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

app.delete('/scores/:id', (req, res) => {
  let { id } = req.params;
  deleteMovieByID(id)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
