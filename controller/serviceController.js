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

router.post('/active',async(req,res)=>{
    try {
        const serviceId=req.query.serviceId;
        const user=await User.findOne({where:{
            email:req.query.email
        }})
        if(!user){
            return res.json('user not found')
        
        }
        console.log(user.id,'--->',serviceId);
        const checkServiceRequested=await ServiceRequest.findOne({
            where:{
                UserId:user.id,
                availableServiceId:serviceId
            }
        })

        if(checkServiceRequested){
            return res.status(400).json('service already requested')
        }
        const service= await Service.findByPk(serviceId);
        const requestedServiceCreated=await ServiceRequest.create({
            title:service.title,
            description:service.description,
            status:'pending',
            UserId:user.id,
            availableServiceId:service.id
        })


        setTimeout(async()=>{
         await ServiceRequest.update({
            status:'active'
         },{
            where:{
                UserId:requestedServiceCreated.UserId,
                availableServiceId:requestedServiceCreated.availableServiceId
            }
         })
        },30000)

        const requestedService=await ServiceRequest.findAll();
        res.json(requestedService)

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
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