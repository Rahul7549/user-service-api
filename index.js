const express=require('express')
const cors=require('cors')
const { log } = require('console');
const app=express();
const https = require('https');
const axios = require('axios');
const { Sequelize, DataTypes } = require('sequelize');
const {productList,serviceList}=require('./data/localVariable')

const sequelize = require('./dbConfigration'); // Your Sequelize instance
const User = require('./models/User');
// const Role = require('./models/');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json())
const port=5000;
app.use(bodyParser.urlencoded({ extended: true }));




sequelize.sync({ force: true }).then(() => {
    console.log('Database and tables created!');
});




  app.post('/users', async (req, res) => {
    try {
      const { name } = req.body;
      const user = await User.create({ name });
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });




app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
    // console.log("productList" ,serviceList)

})

app.get('/test',async (req,res,next)=>{
    return res.send('method called')
})



app.get('/zoho-token', async (req, res) => {
    let zohoTokenUrl=`https://accounts.zoho.in/oauth/v2/token?refresh_token=${process.env.REFRESH_TOKEN}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=refresh_token`;
    axios.post(zohoTokenUrl.toString(),{httpsAgent:new https.Agent({ 
        rejectUnauthorized: false,
    })})

        .then(response => {
            process.env.ACCESS_TOKEN=response.data.access_token;
            return res.send(response.data
                // REFRESH_TOKEN:process.env.REFRESH_TOKEN,
                // CLIENT_ID:process.env.CLIENT_ID,
                // CLIENT_SECRET:process.env.CLIENT_SECRET,
                // GRANT_TYPE:process.env.GRANT_TYPE
            );
        })
        .catch(error => {
            return res.send(error
                // REFRESH_TOKEN:process.env.REFRESH_TOKEN,
                // CLIENT_ID:process.env.CLIENT_ID,
                // CLIENT_SECRET:process.env.CLIENT_SECRET,
                // GRANT_TYPE:process.env.GRANT_TYPE
            // }
            )
        });
});

app.use('/auth',require('./routes/Auth'))
app.use('/user',require('./controller/userController'))
app.use('/service',require('./controller/serviceController'))
app.use('/requested-service',require('./controller/requestedServiceController'))

