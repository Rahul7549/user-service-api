const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfigration');
const User=require('./User')
const ServiceRequest = sequelize.define('ServiceRequest', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  status:{
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// User.belongsToMany(Role, { through: UserRole });
// Role.belongsToMany(User, { through: 'UserRole' });

module.exports = ServiceRequest;