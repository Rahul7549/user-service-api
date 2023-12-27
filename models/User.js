

const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfigration'); 

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zohouser: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }, 
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


module.exports = User;
