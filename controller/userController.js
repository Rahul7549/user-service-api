const express=require('express')
const { Sequelize, DataTypes, where } = require('sequelize');
const  User  = require('../models/User');
// import {user} from '../models/user'
const { body, validationResult } = require('express-validator');
const router=express.Router()

router.post('/',[
  body('name','Name must not be empty').notEmpty(),
  body('city','City must not be empty').notEmpty(),
  body('phone','Please enter valid Phone number').isLength({ min: 10 }),
  body('email','please enter valid email').isEmail()
] ,async (req, res) => {
    // console.log('User-> ',User);
    try {
      
      const error = validationResult(req)
      if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() })
      }
      const newUser = await User.create({
        name: req.body.name,
        city: req.body.city,
        email: req.body.email,
        phone:req.body.email,
        zohouser:false
      });
  
      res.json(newUser)
      
      // const users = await User.findAll();
      // res.json(users);
    } 
    catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


router.get('/',async(req,res)=>{
  try{
    const users=await User.findAll();
    res.json(users)
  }
  catch(error){
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.get('/:userId',async(req,res)=>{
  try{
    const user=await User.findAll({where:{email:req.params.userId}})
    return res.json(user)
  }
  catch(error){
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.put('/:userId',[
  body('name','Name must not be empty').notEmpty(),
  body('city','City must not be empty').notEmpty(),
  body('phone','Please enter valid Phone number').isLength({ min: 10 }),
  body('email','please enter valid email').isEmail()
],async(req,res)=>{
  try {
    const inputValidation = await validationResult(req);
        if (!inputValidation.isEmpty()) {
            return res.status(400).send({ errors: inputValidation.array() })
        }

    const user=await User.findByPk(req.params.userId)
    if(!user){
      return res.json("user not found")
    }
    const newUser={}
    const { name, city, phone,email } = req.body;
    if(name){
      newUser.name=name;
    }
    if(city){
      newUser.city=city
    }
    if(phone){
      newUser.phone=phone
    }
    if(email){
      newUser.email=email
    }

    await user.update(newUser);
    const updatedUser = await User.findByPk(req.params.userId);
    res.send(updatedUser);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
})

  module.exports=router