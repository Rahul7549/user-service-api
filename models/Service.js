const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfigration');
const Service = sequelize.define('availableService', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description:{
    type: DataTypes.STRING,
    allowNull: false,
  }
});


module.exports = Service;
