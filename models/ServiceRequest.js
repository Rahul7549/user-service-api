const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfigration');
const User = require('./User');
const Service = require('./Service');
const ServiceRequest = sequelize.define('ServiceRequest', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull:false,
    primaryKey:true,
    references: {
      model: User,
      key: 'id'
    }
  },
  availableServiceId: {
    type: DataTypes.INTEGER,
    allowNull:false,
    primaryKey:true,
    references: {
      model: Service,
      key: 'id'
    }
  }

});




module.exports = ServiceRequest;