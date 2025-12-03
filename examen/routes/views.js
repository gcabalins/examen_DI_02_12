const express = require('express');
const router = express.Router();


// Página principal
router.get('/home', (req, res) => {
res.render('home', { user: req.session.user });
});


// Vista 1
router.get('/vista1', (req, res) => {
res.render('vista1');
});


// Vista 2
router.get('/vista2', (req, res) => {
res.render('vista2');
});


module.exports = router;