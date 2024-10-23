import Customer from "./Customer"

 const Home = (props) => {
  const{showAlert}= props
  
  return (
    <div>
      
<Customer showAlert={showAlert}/> 
 
    </div>
  )
}

export default Home