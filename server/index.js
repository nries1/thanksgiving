const { app } = require('./app');
const PORT = 3000;
const { db } = require('../db');
const { seed } = require('../db/index.js');
/*
  DO NOT TOUCH THIS FILE
*/

db.sync({ force: true })
  .then(() => seed())
  .then(() => {
    app.listen(PORT, () => {
      console.log('listenin');
    });
  });
