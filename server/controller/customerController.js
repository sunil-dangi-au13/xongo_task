const Customer = require('../models/customer');
const{body,validationResult} = require('express-validator');

// Create a new book//

exports.createcustomer =async(req,res)=>{
    [
        body('name','Enter a customer name').isLength({min:5}),
        body('email', 'Enter a valid email').isEmail(),
        body('address','address atleast 6 character').isLength({min:6}),
    ]
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
    }
    try {
        
        const{name,email,address}= req.body
    
     // check Customer with alredy exist same name----->>>>>//

     let customerval = await Customer.findOne({ name: req.body.name });
         if (customerval) {
            return res.status(400).json({ error: 'Customer is already exist with this name' })
         }
    
    const customer = new Customer({name,email,address,userid: req.user})
    const savedcustomer = await customer.save()
    res.json(savedcustomer)
    console.log('----...',savedcustomer)
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send(' Internal server error')
    }
    
}


// Fetch all customers--------//

exports.fetchcustomers =async(req,res)=>{
    const userid = req.user 
    //console.log('userid',userid);
    try {
        const customers = await Customer.find({})
        res.json(customers)  
    } catch (error) {
        console.error(error.message);
        res.status(500).send(' Internal server error')
    }
}



// Update the customer by id--------//

exports.updatecustomer =async(req,res)=>{
    const{name,email,address}= req.body;
    const id = req.params._id
    trimmed_id = id?.trim()
    console.log("id",id)
    //Create a new customer object------//
    const newcustomer = {};
    if(name){newcustomer.name = name}
    if(email){newcustomer.email = email}
    if(address){newcustomer.address = address}

    //find the customer and update it----->>>>//
    const customer = await Customer.findById(req.params.id);
    console.log(customer,'----->>>>>');
    if(!customer){return res.status(404).send("customer not found")}
    if(customer?.userid?.toString()!== req?.user){return res.status(401).send("Acess denied")}

    const updatecustomer = await Customer.findByIdAndUpdate(req.params.id, {$set:newcustomer},{new:true});
    console.log(updatecustomer,'----->>>>');
    res.json({updatecustomer});

}



//    Delete Customer by Id --------//

exports.deletecustomer =async(req,res)=>{
    const{name,email,address}= req.body;

    //find the customer and Delete it----->>>>//
    const customer = await Customer.findById(req.params.id);
    //console.log(customer,'----->>>>>');
    if(!customer){return res.status(404).send("customer not found")}
    const deletecustomer = await Customer.findByIdAndDelete(req.params.id);
    res.json({"Sucess":"Customer deleted Sucessfully"});

}
