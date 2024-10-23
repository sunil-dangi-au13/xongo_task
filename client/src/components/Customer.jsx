import React, { useContext, useEffect, useRef,useState } from 'react';
import CustomerContext from '../context/customer/CustomerContext';
import Customeritem from './Customeritem';
import AddCustomer from './AddCustomer';
import { useNavigate } from 'react-router-dom';


const Customer = (props) => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortCriteria, setSortCriteria] = useState("name"); 
  const [sortedCustomers, setSortedCustomers] = useState([]);
  const context = useContext(CustomerContext);
  const {acessToken}= context
  const { customer, addCustomer, getcustomers,editCustomer } = context

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCustomers = customer.filter((cust) => 
    cust.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    cust.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cust.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const sortedCustomers = filteredCustomers.sort((a, b) => {
  //   if (sortBy === "name") {
  //     return a.name.localeCompare(b.name);
  //   } else if (sortBy === "email") {
  //     return a.email.localeCompare(b.email);
  //   }
  //   return 0;
  // });
  
  
  useEffect(() => {
    if(localStorage.getItem("token")){
      getcustomers(addCustomer)
    }
    else{
     navigate("/login")
    }
    
   }, [])

   useEffect(() => {
    let sorted = [...customer];
    sorted.sort((a, b) => a[sortCriteria].localeCompare(b[sortCriteria]));
    setSortedCustomers(sorted);
  }, [customer, sortCriteria]);
  
  const ref = useRef(null);
  const refclose = useRef(null);
  const[customers,setCustomers] = useState({id:"",ename:"",eemail:"",eaddress:""})

  const updateCustomer = (currentcustomer) => {

    ref.current.click()
    setCustomers({id:currentcustomer?._id, ename:currentcustomer?.name,eemail:currentcustomer?.email,eaddress:currentcustomer?.address})

    
  }
  const handleClick = (e)=>{
    refclose.current.click()
    props.showAlert("Updated Sucessfully", "Sucess")
    editCustomer(customers.id,customers.ename,customers.eemail,customers.eaddress)
    
   }
   const onChange = (e)=>{
    setCustomers({...customers,[e.target.name]:e.target.value})
   }
  return (
    <>
      <AddCustomer showAlert={props.showAlert} />

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Customer</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="ename" name='ename' value={customers.ename} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="text" className="form-control" id="eemail" name='eemail' value={customers.eemail} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Address</label>
                  <input type="text" className="form-control" id="eaddress" name='eaddress' value={customers.eaddress} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handleClick} type="button" className="btn btn-primary">Update Customer</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-6">
        <h2>Customer Listing</h2>
        <div className='my-3'>
        <select onChange={(e) => setSortBy(e.target.value)}>
  <option value="name">Sort by Name</option>
  <option value="email">Sort by Email</option>
</select>
</div>
<div className='my-3'>

        <input
  type="text"
  placeholder="Search by name, email, or address"
  value={searchTerm}
  onChange={handleSearchChange}
/>
</div>
        {filteredCustomers.length == 0 && "No Customer Availble"}
        {filteredCustomers.map((customer) => {
          return <Customeritem key={customer._id} updateCustomer={updateCustomer} showAlert={props.showAlert} customers={customer} />
        })}
      </div>
    </>
  )
}

export default Customer