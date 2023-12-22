const {Sequelize,DataType}=require('sequelize')
require('dotenv').config();

postgres://render123:pMZsKvbiGlRw8xGVIPBSFTCDTEgEmx3O@dpg-cm0rjui1hbls73dev2f0-a.singapore-postgres.render.com/servicedb01

// postgres://rahul:0UBbQMfqN4sbgmkmpDx1bQy5DajmYh7w@dpg-cm2o3ha1hbls73fr0im0-a.oregon-postgres.render.com/userservice_omv8

console.log('userservice_omv8','rahul','0UBbQMfqN4sbgmkmpDx1bQy5DajmYh7w');
const sequelize=new Sequelize('userservice_omv8','rahul','0UBbQMfqN4sbgmkmpDx1bQy5DajmYh7w',{
    host:'dpg-cm2o3ha1hbls73fr0im0-a.oregon-postgres.render.com',
    dialect:'postgres',
    dialectOptions:{
    ssl:{
      require: true,
      rejectUnauthorized:true
    }
    },
    pool: {
        max: 10, // Maximum number of connections in the pool
        min: 0,  // Minimum number of connections in the pool
        acquire: 30000, // Timeout for acquiring a connection from the pool (in milliseconds)
        idle: 10000,    // Timeout for releasing a connection back to the pool (in milliseconds)
      }
})


console.log('connected to data base',);


module.exports=sequelize;