const Sequelize = require('sequelize');
const sequelize = require('../lib/database');

const Users = sequelize.define('users', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },

});
module.exports = Users;
