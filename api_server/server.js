const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Konfiguracja bazy danych
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pa$$word1',
    database: 'zhrapp'
});

// Połączenie z bazą danych
db.connect((err) => {
    if (err) {
        console.error('Błąd połączenia z bazą danych:', err);
        return;
    }
    console.log('Połączono z bazą danych MySQL');
});

// Endpoint pobierający dane
app.get('/api/harcerki', (req, res) => {
    const sql = 'SELECT * FROM harcerki';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send('Błąd serwera');
            return;
        }
        else
        {
        res.json(results);
        console.log(results);
        }
    });
});

app.listen(port, () => {
    console.log(`Serwer działa na http://localhost:${port}`);
});
