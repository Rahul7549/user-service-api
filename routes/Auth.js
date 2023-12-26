const express = require("express")
const router = express.Router();
const https = require('https');
const axios = require('axios');
const httpsAgent = require('https-agent');
const { log } = require("console");
const User = require("../models/User");
const { where } = require("sequelize");
require('dotenv').config();
const bcrypt = require('bcryptjs')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
const access_token = '1000.96b97658eb9e76acc28d0413bea4ae94.c1bebb0a82cb910e8abecaa65eab2221'





// router.post('/zoho-user', async (req, res) => {

//     try {
//         let zohoUrl = `http://www.zohoapis.in/crm/v5/users/search`;
//         const authToken = `Zoho-oauthtoken ${process.env.ACCESS_TOKEN}`;
//         const config = {
//             headers: {
//                 'Authorization': authToken.toString(),
//                 'Content-Type': 'application/json',
//             },
//             params: {
//                 'email': req.query.email,
//             },
//             httpsAgent: new https.Agent({
//                 rejectUnauthorized: false,
//             })

//         };

//         const zohoUser = await axios.get(zohoUrl, config)
//         if (!zohoUser.data || Object.keys(zohoUser.data).length === 0) {
//             try {
//                 const LocalUser = await User.findOne({ where: { email: req.query.email } })
//                 console.log( req.body.password);
//                 const matchedPwd =bcrypt.compare(LocalUser.password, req.body.password);
//                 if (!matchedPwd) {
//                     return res.status(400).json({ errors: 'please try to login with correct credential' })
//                   }
//                 let users=[]
//                 users.push(LocalUser)
//                  let user = {
//                     users: users
//                 }
//                 return res.json(user)
//             } catch (error) {

//                 res.json('Internal server error')

//             }
//         } else {
//             try {
//                 const LocalUser = await User.findOne({ where: { email: req.query.email } })
//                 const matchedPwd = bcrypt.compare(LocalUser.password, req.body.password);
//                 if (!matchedPwd) {
//                     return res.status(400).json({ errors: 'please try to login with correct credential' })
//                   }
//                 let users=[]
//                 users.push(LocalUser)
//                  let user = {
//                     users: users
//                 }
//                 return res.json(user)
//             } catch (error) {

//                 res.json('Internal server error')

//             }
//             console.log('Data received:', zohoUser.data);
//         }
//         // res.json(zohoUser.data)


//     } catch (error) {
//         res.json('Internal server error')
//     }


// });





router.post('/zoho-token', async (req, res) => {
    let zohoTokenUrl = `https://accounts.zoho.in/oauth/v2/token?refresh_token=${process.env.REFRESH_TOKEN}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=refresh_token`;
    axios.post(zohoTokenUrl.toString(), {
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        })
    })

        .then(response => {
            process.env.ACCESS_TOKEN = response.data.access_token;
            return res.send(response.data);
        })
        .catch(error => {
            console.log('fetch the user token error');
            return res.send(error)
        });
});

module.exports = router