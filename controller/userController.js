const express = require('express')
const { Sequelize, DataTypes, where } = require('sequelize');
const User = require('../models/User');
const https = require('https');
const axios = require('axios');
const { body, validationResult } = require('express-validator');
const router = express.Router()
router.post('/', [
  body('name', 'Name must not be empty').notEmpty(),
  body('city', 'City must not be empty').notEmpty(),
  body('phone', 'Please enter valid Phone number').isLength({ min: 10 }),
  body('email', 'please enter valid email').isEmail()
], async (req, res) => {
  // console.log('User-> ',User);
  try {

    const error = validationResult(req)
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() })
    }

    let zohoUrl = `http://www.zohoapis.in/crm/v5/users/search`;
    const authToken = `Zoho-oauthtoken ${process.env.ACCESS_TOKEN}`;
    const config = {
      headers: {
        'Authorization': authToken.toString(),
        'Content-Type': 'application/json',
      },
      params: {
        'email': req.body.email,
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      })

    };
    const zohoUser = await axios.get(zohoUrl, config)
    if (!zohoUser.data || Object.keys(zohoUser.data).length === 0) {
        const LocalUser = await User.findOne({ where: { email: req.body.email } })
        if (LocalUser) {
          let users = []
          users.push(LocalUser)
          let user = {
            users: users
          }
          return res.json({LocalUser,message:'Local user already exist'})
        }else{
          const newUser = await User.create({
            name: req.body.name,
            city: req.body.city,
            email: req.body.email,
            phone: req.body.phone,
            zohouser: false
          });
          let users = []
          users.push(newUser)
          return res.json({newUser,message:'Local user created'})

        }
    } else {
      const LocalUser = await User.findOne({ where: { email: req.body.email } })
        if (LocalUser) {
          
          return res.json({LocalUser,message:'Zoho user already exist as local user'})
        }else{
          const newUser = await User.create({
            name: req.body.name,
            city: req.body.city,
            email: req.body.email,
            phone: req.body.phone,
            zohouser: true
          });
          let users = []
          users.push(newUser)
          let user = {
            users: users
          }
          res.json({newUser,message:'Zoho user created as local user'})
        }

      
    }
  }
  catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users)
  }
  catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findAll({ where: { email: req.params.userId } })
    return res.json(user)
  }
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.put('/:userId', [
  body('name', 'Name must not be empty').notEmpty(),
  body('city', 'City must not be empty').notEmpty(),
  body('phone', 'Please enter valid Phone number').isLength({ min: 10 }),
  body('email', 'please enter valid email').isEmail()
], async (req, res) => {
  try {
    const inputValidation = await validationResult(req);
    if (!inputValidation.isEmpty()) {
      return res.status(400).send({ errors: inputValidation.array() })
    }

    const user = await User.findByPk(req.params.userId)
    if (!user) {
      return res.json("user not found")
    }
    const newUser = {}
    const { name, city, phone, email } = req.body;
    if (name) {
      newUser.name = name;
    }
    if (city) {
      newUser.city = city
    }
    if (phone) {
      newUser.phone = phone
    }
    if (email) {
      newUser.email = email
    }

    await user.update(newUser);
    const updatedUser = await User.findByPk(req.params.userId);
    res.send(updatedUser);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

})

module.exports = router