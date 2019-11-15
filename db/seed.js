const Person = require('./models/Person.js');
const Dish = require('./models/Dish.js');
const people = require('./people.js');
const dishes = require('./dishes.js');

const seed = async () => {
  const newPeople = await Promise.all(
    people.map(newPerson => Person.Person.create(newPerson))
  );
  const newDishes = await Promise.all(
    dishes.map(newDish =>
      Dish.Dish.create({
        ...newDish,
        preparedBy: Number(
          newPeople[Math.floor(Math.random() * people.length)].id
        )
      })
    )
  );
  return { newPeople, newDishes };
};

module.exports = { seed };
