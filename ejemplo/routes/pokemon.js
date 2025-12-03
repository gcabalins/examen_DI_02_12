const express = require('express');
const router = express.Router();

const { findPokemonById, findAllPokemonTypes } = require('../public/javascripts/dataService');

// Detalle de un pokémon
router.get('/:id', (req, res) => {
  const pokemon = findPokemonById(req.params.id);

  if (!pokemon) {
    return res.status(404).render('pages/not-found', {
      title: 'Pokémon no encontrado'
    });
  }

  const tipos = Array.from(findAllPokemonTypes());

  res.render('pages/detail', {
    title: pokemon.nombre,
    pokemon,
    tipos
  });
});

module.exports = router;
