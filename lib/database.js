const Sequelize = require('sequelize');

const sequelize = new Sequelize('ideasdb1.0', 'danis', 'danis', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    timestamps: false,
  },
});
module.exports = sequelize;
