

const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfigration'); 
const { v4: uuidv4 } = require('uuid');
const UserRoles = require('./UserRole');

const User = sequelize.define('User', {
  id:{
    type:DataTypes.UUID,
    primaryKey:true,
    defaultValue:DataTypes.UUIDV4
  },
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
  // userRoleId: {
  //   type: DataTypes.UUID,
  //   allowNull:true,
  //   // primaryKey:true,
  //   references: {
  //     model: UserRoles,
  //     key: 'id'
  //   }
  // }
});


module.exports = User;
