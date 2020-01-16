const Sequelize = require('sequelize');
const {sequelize} = require('../database/mysqldb_connection');

const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  }
})
User.sync().catch(err => console.error('Please Check Your Database credentials?'));

module.exports = User;
