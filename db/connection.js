const Sequelize = require('sequelize');
//for mac
const db = new Sequelize('postgres://localhost:5432/tgives', {
  logging: false
});

//for pc
// const db = new Sequelize("tgives", "postgres", "password", {
//   host: "localhost",
//   dialect: "postgres",
//   logging: false
// });

/*
  DO NOT TOUCH THIS FILE
  had to sorry.
*/

module.exports = { db };
