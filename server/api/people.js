/* eslint-disable function-paren-newline */
/* eslint-disable no-confusing-arrow */
const express = require('express');
const router = express.Router();

const { Person, Dish } = require('../../db');

// make sure to use router.get, router.post etc..., instead of app.get, app.post, or etc... in this file.
// see https://expressjs.com/en/api.html#router

router.use((req, res, next) => {
  next();
});

router.get('/', (req, res, next) => {
  Person.findAll({ include: [{ model: Dish }] })
    .then(data =>
      req.query.is_attending
        ? data.filter(
            person => person.isAttending.toString() === req.query.is_attending
          )
        : data
    )
    .then(data => {
      res
        .type('json')
        .status(200)
        .send(data);
    });
});

router.post('/', (req, res, next) => {
  if (
    !req.query.name ||
    ['true', 'false'].indexOf(req.query.is_attending) === -1
  ) {
    res
      .type('json')
      .status(400)
      .send({
        error: 'A person needs a name and an rsvp status of true or false'
      });
  }
  Person.create({
    name: req.query.name,
    isAttending: req.query.is_attending
  })
    .then(person => {
      res
        .type('json')
        .status(400)
        .send(person);
    })
    .catch(error => {
      res
        .type('json')
        .status(500)
        .send({ error });
    });
});

router.put('/', (req, res, next) => {
  if (req.query.id.match(/0-9/, []) === null) {
    res
      .status(400)
      .type('json')
      .send({ error: 'Invalid ID' });
  }
  Person.update(
    {
      name: req.query.name,
      isAttending: req.query.is_attending
    },
    {
      returning: true,
      where: { id: req.query.id }
    }
  )
    .then(updatedPerson => {
      res.send(updatedPerson);
    })
    .catch(error => {
      res.send(error);
    });
});

router.delete('/', async (req, res, next) => {
  //Person.findById() is not a function ?
  if (req.query.id.match(/[0-9]/) === null) {
    res
      .status(400)
      .type('json')
      .send({ error: 'Invalid ID' });
  }
  Person.destroy({ where: { id: req.query.id } })
    .then(deletedRows => {
      res.status(200).send(deletedRows.toString());
      //removing toString causes jest to throw this error:  Async callback was not invoked within the 5000ms timeout specified by jest.setTimeout.Timeout
    })
    .catch(e => {
      res.send({ error: `Error deleting from the database: ${e}` });
    });
});

module.exports = router;
