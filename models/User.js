// 'use strict';
// const {
//   Model
// } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   User.init({
//     name: DataTypes.STRING,
//     city: DataTypes.STRING,
//     email: DataTypes.STRING,
//     phone: DataTypes.STRING,
//     zohoUser: DataTypes.BOOLEAN
//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };


const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfigration'); // Your Sequelize instance
const Role=require('./Service')
const UserRole=require('./ServiceRequest')
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  zohouser:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }
});


// User.belongsToMany(Role,{through:'userRole'})
// User.belongsToMany(Role, { through: UserRole });
// Role.belongsToMany(User, { through: UserRole });


module.exports = User;
