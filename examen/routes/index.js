var express = require('express');
var router = express.Router();

// Página principal (usa index.ejs)
router.get('/', function(req, res) {
  console.log("Sesión actual:", req.session);
  res.render('index', { user: req.session.user });
});

// Vista 1
router.get('/vista1', function(req, res) {
  res.render('vista1');
});

// Vista 2
router.get('/vista2', function(req, res) {
  res.render('vista2');
});

module.exports = router;
