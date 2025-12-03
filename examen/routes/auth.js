const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const usersPath = path.join(__dirname, "..", "public", "data", "users.json");

// Login GET
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// Login POST
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const users = JSON.parse(fs.readFileSync(usersPath));

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    req.session.user = user;
    return res.redirect('/');
  }

  res.render('login', { error: 'Usuario o contraseña incorrectos' });
});

// Registro GET
router.get('/register', (req, res) => {
  res.render('register', { error: null });
});

// Registro POST
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  const users = JSON.parse(fs.readFileSync(usersPath));

  if (users.find(u => u.username === username)) {
    return res.render('register', { error: 'El usuario ya existe' });
  }

  users.push({ username, password });

  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

  res.redirect('/login');
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
