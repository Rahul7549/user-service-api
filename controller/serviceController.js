const express=require('express')
const { Sequelize, DataTypes, where } = require('sequelize');
const  User  = require('../models/User');
// import {user} from '../models/user'
const { body, validationResult } = require('express-validator');
const router=express.Router()
const {productList,serviceList}=require('../data/localVariable')
const Service=require('../models/Service')
const ServiceRequest=require('../models/ServiceRequest')



router.get('/',async(req,res)=>{
    try {
         const service= await Service.findAll();
         console.log('service ',service);
         if(service){
            res.json(service);
         }
         else{
            res.json('No service available')
         }

    } catch (error) {
        // console.log('Intenal server Error');
        res.status(500).json('Intenal server Error 123')
    }
})


router.post('/',async(req,res)=>{

    const newUser = await Service.create({
        title: req.body.title,
        description: req.body.description
      });
    res.json(newUser)

})

router.get('/:serviceId',async(req,res)=>{
    try {
        const service=await Service.findByPk(req.params.serviceId)
        if(service){
            res.json(service);
        }
        else{
            res.json('Service not found')
        }

    } catch (error) {
        console.log('Intenal server Error');
        res.status(500).json('Intenal server Error')
    }
})

router.post('/active/:serviceId',async(req,res)=>{
    try {
        
        const service= await Service.findByPk(req.params.serviceId);
        // service.title='active';
        await ServiceRequest.create({
            title:service.title,
            description:service.description,
            status:'active'
        })

         const requestedService=await ServiceRequest.findAll();
         res.json(requestedService)

    } catch (error) {
        console.log('Intenal server Error');
        res.status(500).json('Intenal server Error')
    }
})

router.post('/deactive/:serviceId',async(req,res)=>{
    try {
        const service= await Service.findByPk(req.params.serviceId);
        // service.title='active';
        await ServiceRequest.create({
            title:service.title,
            description:service.description,
            status:'deactive'
        })

         const requestedService=await ServiceRequest.findAll();
         res.json(requestedService)

    } catch (error) {
        console.log('Intenal server Error');
        res.status(500).json('Intenal server Error')
    }
})



module.exports=router