const express = require('express');
const router = express.Router();

const {
  findAllPokemons,
  findAllPokemonTypes,
  findAllPokemonsByType
} = require('../public/javascripts/dataService');

// Home: muestra todos los pokémon
router.get('/', (req, res) => {
  const pokemons = findAllPokemons();
  const tipos = Array.from(findAllPokemonTypes());

  res.render('pages/home', {
    title: 'PokéDex',
    pokemons,
    tipos,
    tipoActual: 'Todos'
  });
});

// Listado por tipo: /tipo/Agua, /tipo/Fuego, etc.
router.get('/tipo/:tipo', (req, res) => {
  const tipo = req.params.tipo;
  const pokemons = findAllPokemonsByType(tipo);
  const tipos = Array.from(findAllPokemonTypes());

  if (!pokemons || pokemons.length === 0) {
    return res.status(404).render('pages/not-found', {
      title: 'Tipo no encontrado'
    });
  }

  res.render('pages/type', {
    title: `Pokémon de tipo ${tipo}`,
    pokemons,
    tipos,
    tipoActual: tipo
  });
});

module.exports = router;
