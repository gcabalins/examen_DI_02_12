const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const expressLayouts = require('express-ejs-layouts');

const app = express();
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/layout')

// Seguridad y performance
app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(compression());

// Motor EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const indexRouter = require('./routes/index');
const pokemonRouter = require('./routes/pokemon');
app.use('/', indexRouter);
app.use('/pokemon', pokemonRouter);

// 404
app.use((req, res) => {
  res.status(404).render('pages/not-found', { title: 'Página no encontrada' });
});


module.exports = app;