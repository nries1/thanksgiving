const { db } = require('./connection');
const { Dish } = require('./models/Dish.js');
const { Person } = require('./models/Person.js');
const { seed } = require('./seed.js');

// Create your associations here!

module.exports = {
  db,
  Dish,
  Person,
  seed
};
