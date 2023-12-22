const express=require('express')
const { Sequelize, DataTypes, where } = require('sequelize');
const  User  = require('../models/User');
// import {user} from '../models/user'
const { body, validationResult } = require('express-validator');
const router=express.Router()
const {productList,serviceList}=require('../data/localVariable')
const Service=require('../models/Service')
const ServiceRequest=require('../models/ServiceRequest');




router.get('/',async(req,res)=>{
try {
    const requestedService=await ServiceRequest.findAll();
    if(requestedService){
        res.json(requestedService)
    }
    else{
        res.json('No service requested')
    }
} catch (error) {
    
}
})

module.exports=router