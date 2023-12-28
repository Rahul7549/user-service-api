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
    const userRequestedServices=await User.findOne({
        where:{
            email:req.query.email
        },
        include:ServiceRequest,
    });
    if(userRequestedServices){
        res.json(userRequestedServices.ServiceRequests)
    }
    else{
        res.json([])
    }
} catch (error) {
    
}
})

router.get('/all-requested-service', async(req,res)=>{
    const requestedService=await ServiceRequest.findAll({
        include:User
    })
    res.json(requestedService)
})

module.exports=router