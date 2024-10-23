import {useContext} from 'react';
import CustomerContext from '../context/customer/CustomerContext';


const Customeritem = (props) => {
  const context = useContext(CustomerContext);
  const{deleteCustomer} = context

    const{customers,updateCustomer}= props;
    console.log('name',customers?.name)
  return (
    <div className='col-md-6'>
    <div className="card my-2">
    <div className="card-body">
    <button type="button" className="btn btn-success mx-1" onClick={()=>{updateCustomer(customers)}}>Edit</button>
    <button type="button" className="btn btn-danger" onClick={()=>{deleteCustomer(customers._id); props.showAlert("Deleted Sucessfully","sucess")}}>Delete</button>
    <h5 className="card-title">{customers?.name}</h5>
    <p className="card-text">{customers?.email}</p>
    <p className="card-text">{customers?.address}</p>
  </div>
</div>

     
</div>

    
  )
}

export default Customeritem