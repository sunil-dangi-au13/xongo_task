import React, { useState,useContext } from 'react';
import customerContext from '../context/customer/CustomerContext';
import { Email } from '@material-ui/icons';
 


const addCustomer = (props) => {
    
    
    const[customer,setCustomer] = useState({name:"",email:"",address:""})
    const validatefields = ()=>{
        if(customer.name == ""){
            alert("Enter your name here")
            return
        }
        if(customer.email == ""){
            alert("Enter your email here")
            return
        }
        if(customer.address == ""){
            alert("Enter your address here")
            return
        }
        return true;
    }
    const context = useContext(customerContext);
   const{addCustomer} = context
   const handleClick = (e)=>{
    if(!validatefields()){
        return
    }
    e.preventDefault()
    
  addCustomer(customer.name, customer.email, customer.address)
  props.showAlert("Customer Added Sucessfully","sucess")
  setCustomer({name:"",email:"",address:""})
   }
   const onChange = (e)=>{
    setCustomer({...customer,[e.target.name]:e.target.value})

   }
  return (
    <div className="container my-3">
    <h2>Add a Customer</h2>
    <form className='my-3'>
<div className="mb-3">
  <label htmlFor="name" className="form-label">Name</label>
  <input type="text" className="form-control" id="nme" name='name' aria-describedby="emailHelp" value={customer
  .name} onChange={onChange}/>
</div>
<div className="mb-3">
  <label htmlFor="email" className="form-label">Email</label>
  <input type="text" className="form-control" id="email" name='email' value={customer.email} onChange={onChange}/>
</div>
<div className="mb-3">
  <label htmlFor="address" className="form-label">Address</label>
  <input type="text" className="form-control" id="author" name='address' value={customer.address} onChange={onChange}/>
</div>
<button disabled ={customer.name.length<5 || customer.address.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Customer</button>
</form>
</div>
  )
}


export default addCustomer