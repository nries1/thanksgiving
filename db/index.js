const { db } = require('./connection');
const { Dish } = require('./models/Dish.js');
const { Person } = require('./models/Person.js');
const { seed } = require('./seed.js');

// Create your associations here!
Dish.belongsTo(Person);
Person.hasOne(Dish);

module.exports = {
  db,
  Dish,
  Person,
  seed
};
