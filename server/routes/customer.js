const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const customercontroller = require('../controller/customerController')



// Route No----- 1    Add Customer:-- Post method----- api/customer/addcustomer--------//
router.post('/addcustomer',customercontroller.createcustomer)

  

//Route No-----2    Get all customers----- Get method---- api/customer/fetchcustomers----->>>>//
router.get('/fetchcustomers',fetchuser,customercontroller.fetchcustomers)

 

//Route No-----3  Customer update by id------>>>> Put method------ api/customer/customerupdate------   //
router.put('/updatecustomer/:id',customercontroller.updatecustomer)

//Rout no -4 customer delete by id-----> delete method------api/customer/deletecustomer//
router.delete('/deletecustomer/:id',customercontroller.deletecustomer)


 
 



module.exports = router;