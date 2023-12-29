const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfigration');
const User = require('./User');
const UserRole = sequelize.define('userRole', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey:true,
    defaultValue: DataTypes.UUIDV4
  },
  role:{
    type: DataTypes.STRING,
    allowNull: false,
  },
//   UserId:{
//     type: DataTypes.UUID,
//     allowNull:true,
//     // primaryKey:true,
//     references: {
//       model: User,
//       key: 'id'
//     }
//   }
});


module.exports = UserRole;
