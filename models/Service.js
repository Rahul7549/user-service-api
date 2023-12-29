const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfigration');
const { v4: uuidv4 } = require('uuid');
const Service = sequelize.define('availableService', {
  id:{
    type:DataTypes.UUID,
    primaryKey:true,
    defaultValue:DataTypes.UUIDV4
  },
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
