const express = require('express')
const { Sequelize, DataTypes, where } = require('sequelize');
const https = require('https');
const axios = require('axios');
const { body, validationResult } = require('express-validator');
const UserRole = require('../models/UserRole');
const User = require('../models/User');
const router = express.Router()

router.post('/admin',async(req,res)=>{
    const userRole=await UserRole.create({
        role:'admin'
    })
    res.json(userRole);
})

router.post('/user',async(req,res)=>{
    const userRole=await UserRole.create({
        role:'user'
    })
    res.json(userRole);
})

router.get('/',async(req,res)=>{
    try {
    const userRole= await UserRole.findAll({
        include:User
    });
        res.json(userRole);
    } 
    catch (error) {
        
    }

})
module.exports = router
