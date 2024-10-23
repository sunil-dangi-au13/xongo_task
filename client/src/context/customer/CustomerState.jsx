import  { useEffect, useState } from "react";
import CustomerContext from "../customer/CustomerContext";
const CustomerState = (props) => {
    const [acessToken, setAcessToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token'):null )
    // console.log('token', acessToken);
    useEffect(()=>{
 if(acessToken){
   localStorage.setItem('token', acessToken)
 }
 else{localStorage.removeItem('token')}
    },[acessToken])
    const host = "http://localhost:3000"
    const notesintial = []
    const [customer, setCustomer] = useState([])

    //Fetch All Customers---->>>>>>//
    const getcustomers = async () => {
        const response = await fetch(`${host}/api/customer/fetchcustomers`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "auth-token":localStorage.getItem("token")
                 //"auth-token": acessToken
            }
        })
        const json = await response.json();
        console.log('fetch customers',json);
        setCustomer(json)

    }
    //Add books------>>>>>>>>>>//
    const addCustomer = async (name, email, address,) => {

        //Api Call--->>>>>>>>>//
        const response = await fetch(`${host}/api/customer/addcustomer`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                //"auth-token": localStorage.getItem("token")
                "auth-token": acessToken
                
            },
            body: JSON.stringify({ name, email, address })

        })
        const json = await response.json();
        console.log(json);
        setCustomer(customer.concat(json))

    }

    //Edit Book------>>>>>>//
    const editCustomer = async (id, name, email, address) => {
        const response = await fetch(`${host}/api/customer/updatecustomer/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                //"auth-token": localStorage.getItem("token")
                "auth-token": acessToken
            },
            body: JSON.stringify({ name, email, address })

        })
        const json = await response.json();
        console.log(json);

        //logic to edit in client--->>>>>>//

        for (let index = 0; index < customer.length; index++) {
            const element = customer[index];
            if (element._id === id) {
                element.name = name;
                element.email = email;
                element.address = address;
            }
        }

    }

    //Delete Customer----->>>>>>>//
    const deleteCustomer = async (id) => {

        //Api Call--->>>>>>>//
        const response = await fetch(`${host}/api/customer/deletecustomer/${id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                //"auth-token": localStorage.getItem("token")
                "auth-token": acessToken
            }
        })
        const json = await response.json();
        console.log(json);


        console.log("Customer is Deleted by id" + id);
        const newcustomer = customer.filter((cust) => { return cust._id !== id })
        setCustomer(newcustomer)

    }
    return (
        <CustomerContext.Provider value={{ customer,  acessToken,setAcessToken, addCustomer,getcustomers, editCustomer, deleteCustomer }}>
            {props.children}
        </CustomerContext.Provider>
    )
}



export default CustomerState;