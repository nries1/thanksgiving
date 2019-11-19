/* eslint-disable no-confusing-arrow */
const router = require('express').Router();
const { Dish, Person } = require('../../db');

// make sure to use router.get, router.post etc..., instead of app.get, app.post, or etc... in this file.
// see https://expressjs.com/en/api.html#router

router.use((req, res, next) => {
  //console.log('dish router received ', req.query);
  next();
});

router.get('/', (req, res, next) => {
  Dish.findAll()
    .then(dishes => {
      return req.query.id
        ? dishes.filter(dish => dish.id.toString() === req.query.id.toString())
        : dishes;
    })
    .then(filteredDishes => {
      res
        .type('json')
        .status(200)
        .send(filteredDishes);
    })
    .catch(error => {
      res
        .status(400)
        .type('json')
        .send({ error });
    });
});

router.post('/', (req, res, next) => {
  Dish.create({
    name: req.query.name,
    description: req.query.description
  })
    .then(newDish => {
      res
        .status(200)
        .type('json')
        .send(newDish);
    })
    .catch(error => {
      res
        .status(400)
        .type('json')
        .send({ error });
    });
});

router.put('/', (req, res, next) => {
  Dish.update(
    {
      name: req.query.name,
      description: req.query.is_attending
    },
    {
      returning: true,
      where: { id: req.query.id }
    }
  )
    .then(updatedDish => {
      res
        .type('json')
        .status(200)
        .send(updatedDish);
    })
    .catch(error => {
      res
        .status(400)
        .type('json')
        .send({ error });
    });
});

router.delete('/', (req, res, next) => {
  Dish.destroy({ where: { id: req.query.id } })
    .then(deletedRow => {
      res
        .type('json')
        .status(200)
        .send(deletedRow);
    })
    .catch(error => {
      res
        .status(400)
        .type('json')
        .send({ error });
    });
});
module.exports = router;
