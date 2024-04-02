const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const UserModel = require("./models/signin-signup")
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')




dotenv.config();
app.use(cors())


const port = process.env.PORT || 3000 
var mongoUrl = process.env.MONGO_URL


mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
  console.log("Database connected");
});
  app.listen(port, ()=>{
      console.log(`Server is running on port : ${port}`)
  })

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());



  app.post('/api/login', async (req, res) => {
    const user = await UserModel.findOne({email : req.body.email})

  if (user == null) {
    return res.status(400).send('Cannot find user')
  }
  try {
    if(await bcrypt.compare(req.body.password, user.password)) {
      res.send('Success')
    } else {
      res.send('Not Allowed')
    }
  } catch {
    res.status(500).send()
  }
  });

  app.post('/api/signup', async (req, res) => {
    let hashedPassword = undefined;
    try {
      hashedPassword = await bcrypt.hash(req.body.password, 10)
    } catch (error) {
      console.log(error)
    }
    console.log(hashedPassword)
    const newData = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
  
    newData.save()
    .then(data => {
      console.log('Data saved successfully:', data);
      res.status(200).send('Data saved successfully');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error saving data');
    });
  });