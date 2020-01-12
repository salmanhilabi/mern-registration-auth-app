const Sequelize = require('sequelize');
// connect to Mysql Database
const sequelize = new Sequelize({
  database: 'mern_register',
  username: 'root',
  password: '',
  dialect: 'mysql',
  logging: false // disable the default log when starting the database
});

const connection = async () => {
   return await sequelize.authenticate()
   .then(() => console.log('Database connected successfully...'))
   .catch(err => console.error('Unable to connect to the database:', err));
}
module.exports = {sequelize, connection};
