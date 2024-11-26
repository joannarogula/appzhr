const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;
app.use(express.json());

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

// Endpoint pobierający dane harcerek z drużyny o podanym ID
app.get('/api/scouts/:id', (req, res) => {
  const { id } = req.params;  // Pobieramy ID drużyny z parametrów URL

  // Zapytanie łączące tabele 'harcerki' i 'zastępy' po 'id_zastępu' i 'id_drużyny'
  const sql = `
      SELECT scouts.*
      FROM scouts
      JOIN patrols ON scouts.patrolId = patrols.id
      WHERE patrols.teamId = ?
  `;

  db.query(sql, [id], (err, results) => {
      if (err) {
        // console.log(id);
          res.status(500).send('Błąd serwera');
          return;
      }
      res.json(results);  // Zwracamy wyniki zapytania
  });
});



app.get('/api/patrols/:id', (req, res) => {
  const { id } = req.params;  // Pobieramy ID drużyny z parametrów URL

  const sql = `
      SELECT *
      FROM patrols
      WHERE teamId = ?
  `;

  db.query(sql, [id], (err, results) => {
      if (err) {
        // console.log(results);
          res.status(500).send('Błąd serwera');
          return;
      }
      // console.log(results);
      res.json(results);  // Zwracamy wyniki zapytania
  });
});

// Logowanie
app.post('/api/login', (req, res) => {
    const { login, password } = req.body; // Odczytujemy dane z requestu

    if (!login || !password) {
        res.status(400).send('Brak loginu lub hasła');
        return;
    }

    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(sql, [login, password], (err, results) => {
        if (err) {
            res.status(500).send('Błąd serwera');
              return;
          }


        if (results.length > 0) {
            res.json({ message: 'Logowanie udane', user: results[0] })
            
        } else {
            res.status(401).json({ message: 'Nieprawidłowy login lub hasło' });
        }
    });
});



// Rejestracja
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    
    
  
    if (!email || !password) {
      return res.status(400).send('Email i hasło są wymagane.');
    }

    console.log(email);
    console.log(password);
    const values = [1, email, password, 'admin'];

  
    try {
      const saltRounds = 10;
    //   const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // const sql2 = 'INSERT INTO `zhrapp`.`użytkownicy` (`id_drużyny`, `email`, `hasło`, `rola`) VALUES (`1`, ?, ?, `admin`);'
      const sql = 'INSERT INTO users (`teamId`, `email`, `password`, `role`) VALUES (?, ?, ?, ?)';
      db.query(sql, values, (err, result) => {
        if (err) {
          console.log("error");
          return res.status(500).send('Błąd serwera.');
        }
        res.status(201).send('Rejestracja zakończona sukcesem.');
        console.log("sukces");
      });
    } catch (err) {
      res.status(500).send('Błąd podczas rejestracji.');
      console.log("błąd");
    }
  });

  // Endpoint do dodawania nowego zastępu
app.post('/api/patrols', async (req, res) => {
  const { name, teamId, newDate } = req.body;

  // Walidacja wejścia
  if (!name || !teamId || !newDate) {
    return res.status(400).send('Nazwa i ID drużyny są wymagane.');
  }

  const values = [name, teamId, newDate];
  

  try {
    const sql = 'INSERT INTO patrols (`name`, `teamId`, `date`) VALUES (?, ?, ?)';
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Błąd podczas dodawania zastępu:', err);
        return res.status(500).send('Błąd serwera.');
      }
      res.status(201).send('Zastęp został dodany.');
    });
  } catch (error) {
    console.error('Błąd serwera:', error);
    res.status(500).send('Błąd serwera.');
  }
});


app.post('/api/scouts', async (req, res) => {
  const { firstName, lastName, email, telephone, birthDate, joinDate, patrolId } = req.body;

  // Walidacja wejścia
  if (!firstName || !lastName || !email || !telephone || !birthDate || !joinDate ||!patrolId) {
    return res.status(400).send('Wszystkie pola są wymagane.');
  }

  const values = [firstName, lastName, email, telephone, birthDate, joinDate, patrolId];

  try {
    const sql = 'INSERT INTO scouts (`firstName`, `lastName`, `email`, `telephone`, `birthDate`, `joinDate`, `patrolId`) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Błąd podczas dodawania harcerki:', err);
        return res.status(500).send('Błąd serwera.');
      }
      res.status(201).send('Harcerka została dodana.');
    });
  } catch (error) {
    console.error('Błąd serwera:', error);
    res.status(500).send('Błąd serwera.');
  }
});

app.get('/api/users/:userId', (req, res) => {
  const { userId } = req.params;  // Pobieramy ID drużyny z parametrów URL

  const sql = `SELECT users.*, teams.name AS team_name
  FROM users
  JOIN teams ON users.teamId = teams.id
  WHERE users.id = ?`;
  

  db.query(sql, [userId], (err, results) => {
      if (err) {
         console.log("błąd");
          res.status(500).send('Błąd serwera');
          return;
      }
      res.json(results);  // Zwracamy wyniki zapytania
  });
});

app.get('/api/scouts/:scoutId/ranks', (req, res) => {
  const { scoutId } = req.params; // Pobieramy ID harcerki z parametrów URL

  const sql = `
    SELECT 
      ranks.id AS rank_id,
      ranks.name AS rank_name,
      ranksScouts.date
    FROM ranksScouts
    JOIN ranks ON ranksScouts.rankId = ranks.id
    WHERE ranksScouts.scoutId = ?
    ORDER BY ranksScouts.date ASC
  `;

  db.query(sql, [scoutId], (err, results) => {
    if (err) {
      console.error('Błąd zapytania do bazy danych:', err);
      res.status(500).send('Błąd serwera');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Nie znaleziono stopni dla tej harcerki');
      return;
    }    
    console.log(results);
    res.json(results); // Zwracamy wyniki jako JSON
  });
});



app.listen(port, () => {
    console.log(`Serwer działa na http://localhost:${port}`);
});
