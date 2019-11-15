const express = require("express");
const router = express.Router();

const { Person, Dish } = require("../../db");

// make sure to use router.get, router.post etc..., instead of app.get, app.post, or etc... in this file.
// see https://expressjs.com/en/api.html#router

router.use((req, res, next) => {
  //res.send('You visited the thanksgiving app');
  next();
});

router.get("/", (req, res, next) => {
  Person.findAll().then(data => {
    res
      .type("json")
      .status(200)
      .send(data);
  });
});

router.route(/\/.*is_attending.*/).get((req, res, next) => {
  const isAttending = req.path.split("=")[1];
  console.log("REQ PARAMS ARE ", req.params);
  console.log("REQ PATH IS ", req.path);
  Person.findAll()
    .then(people =>
      people.filter(person => person.isAttending.toString() === isAttending)
    )
    .then(filteredPeople =>
      res
        .type("json")
        .status(200)
        .send(filteredPeople)
    );
});

module.exports = router;
