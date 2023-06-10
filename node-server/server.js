const express = require('express');
const fs = require('fs');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

//Settings

const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nexus_webshop'
});

// Code

connection.connect((err) => {
  if (err) {
    console.error('Greška prilikom povezivanja na bazu podataka:', err);
    return;
  }
  console.log('Uspešno povezano na bazu podataka!');
});

app.use(express.json());
app.use(cors());

app.get('/phones.json', (req, res) => {
  fs.readFile('phones.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(data);
    }
  });
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;

  connection.query('SELECT * FROM users', (err, users) => {
    if (err) {
      console.error('Greška prilikom izvršavanja SQL upita:', err);
      return;
    }

    const user = users.find(u => u.username === username);
    if (user) {
      res.status(325).json({ error: 'Korisnik sa ovakvim username vec postoji.' });
      return;
    }

    const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
    connection.query(query, [username, password], (err, result) => {
      if (err) {
        console.error('Greška prilikom izvršavanja SQL upita:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        console.log('Korisnik je uspešno registrovan!');
        res.status(200).json({ message: 'Korisnik je uspešno registrovan!' });
      }
    });
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  connection.query('SELECT * FROM users', (err, users) => {
    if (err) {
      console.error('Greška prilikom izvršavanja SQL upita:', err);
      return;
    }

    const user = users.find(u => u.username === username && u.password === password);
      
    if (user) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ success: true }));
    }else {
      res.statusCode = 401;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ success: false }));
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}`);
});