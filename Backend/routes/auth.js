const express = require('express')
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const { findOne } = require('../models/User');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const router = express.Router()

const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET ='Abhinaviaagoodb$oy';
router.post('/createUser', [
  body('name', 'enter a valid name').isLength({ min: 3 }),
  body('email', 'enter a valid email').isEmail(),
  body('password', 'password should be of atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {

  // if there is errors return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //check whether the user with same email exits already
  try {
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ errors: "sorry user with this email already exits" })
    }
    //creating the new user
    const salt = await bcrypt.genSaltSync(10);
const secPass = await  bcrypt.hashSync(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    })
    const data ={
      user:{
       id: user.id
      }
    }
const authtoken= jwt.sign(data,JWT_SECRET);
// console.log(jwtData);

    res.json({status:"true",authtoken})
  } catch (error) {
    console.error(error.message)
    res.status(500).send("some error occured")
  }
})


router.post('/login', [
  body('email', 'enter a valid email').isEmail(),
  body('password', 'password should be of atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //check whether the user with same email exits already
  const {email,password} = req.body;
  try {
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ errors: "sorry user with this email already exits" })
    }

    const passwordCompare = await bcrypt.compare(password,user.password)
    if(!passwordCompare){
      return res.status(400).json({ errors: "sorry user with this email already exits" })
    }
    
    const data ={
      user:{
       id: user.id
      }
    }
const authtoken= jwt.sign(data,JWT_SECRET);
// console.log(jwtData);

    res.json({status:"true",authtoken})
  } catch (error) {
    console.error(error.message)
    res.status(500).send("some error occured")
  }

  // route 3 get loged in user details  /getuser login required
  router.post('/getuser',fetchuser, async (req, res) => {
  try {
    userId = req.user.id
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("some error occured")
  }
})
})
module.exports = router