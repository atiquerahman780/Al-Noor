import React from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

 function Confirmation() {

    const params = new URLSearchParams(window.location.search);
    const navigate = useNavigate();
    const token = params.get('AuthToken');
    const isTokenNull = !token ?  true:true;
    function proceed(){
      console.log(isTokenNull.toString())
      if(isTokenNull.toString()=="false"){
        console.log("your Auth doken is not generated")
      }else{
        const data = { auth: {token} };  // Example data to pass
        navigate('/contacts', { state: { auth: data.auth } });
        console.log("yyynnnn")
      }
    }
  return (
    <div className='review-form-container'>
      <h2>Step 2/4</h2>
      <p>A unique token is generated for security, allowing your payment information to be securely transmitted.</p>
      <div style={{height:"20px"}}></div>
      <p>Auth Token: {isTokenNull.toString()}</p>
      
      {/* <Link to="https://posti.shop/contacts"> */}
      <button onClick={proceed} className="payment-btn">
              Proceed
            </button>
        {/* </Link> */}
    </div>
  )
}
export default Confirmation