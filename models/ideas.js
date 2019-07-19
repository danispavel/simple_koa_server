const Sequelize = require('sequelize');
const sequelize = require('../lib/database');
const Users = require('./users');

const Ideas = sequelize.define('ideas', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  author: {
    type: Sequelize.UUID,
  },
});
Ideas.belongsTo(Users, { foreignKey: 'author', targetKey: 'id' });
module.exports = Ideas;
