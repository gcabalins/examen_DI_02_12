var express = require('express');
var router = express.Router();
const dataProvider = require('../data/dataProvider');

/* GET home page. */
router.get('/', function (req, res, next) {
  const posts = dataProvider.getAllPosts();
  const categorias = dataProvider.getCategories();
  res.render('index', { posts, categorias });
});

/* GET detalle page. */
router.get('/post/:id', function (req, res, next) {
  const post = dataProvider.getPostById(req.params.id);
  const categorias = dataProvider.getCategories();

  if (!post) {
    return res.status(404).send('Post no encontrado');
  }

  res.render('detalle', { post, categorias });
});

/* GET categorías */
router.get('/categoria/:cat', (req, res, next) => {
  const cat = req.params.cat;
  const posts = dataProvider.getAllPosts().filter(p => p.category === cat);
  const categorias = dataProvider.getCategories();
  res.render('index', { posts, categorias });
});


module.exports = router;