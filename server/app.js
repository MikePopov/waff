import express from 'express';
import bodyParser from 'body-parser';
import * as db from './utils/DataBaseUtils';


const app = express();

db.setUpConnection();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');

  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();

  app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
    res.send();
  });
});

app.get('/notes', (req, res) => {
  db.listNotes().then(data => res.send(data))

});

app.post('/note', (req, res) => {
  db.createNote(req.body).then(data => res.send(data));
});

app.delete('/note/:id', (req, res) => {
  db.deleteNote(req.params.id).then(data => res.send(data));
});

const port = 8000;

const server = app.listen(port, () => {
  console.log(`Server running at port: ${port}...`)
});

