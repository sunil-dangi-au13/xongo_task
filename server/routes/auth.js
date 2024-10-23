const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const controller = require('../controller/authController')



// Route No----- 1    Signup User:-- Post method----- api/auth/signup--------//
router.post('/signup',controller.createuser)

  

//Route No-----2    Login-User----- Post method---- api/auth/login----->>>>//
router.post('/login',controller.loginuser)

 

 


 
 



module.exports = router;