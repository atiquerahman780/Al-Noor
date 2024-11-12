import React from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

 function Confirmation() {

    const params = new URLSearchParams(window.location.search);
    const token = params.get('AuthToken');
    const navigate = useNavigate();
    // const token = "asdfghjkl";
    const isTokenNull = !token ?  false:true;
    function proceed(){
      console.log(isTokenNull.toString())
      if(isTokenNull.toString()=="false"){
        console.log("your Auth doken is not generated")
      }else{
        //  const data = { key: {token} };  // Example data to pass
        // navigate('/contacts', { state: { key: data.key } });
        const data = { key: token };  // Example data to pass
  navigate('/contacts', { state: { key: data.key } });
        console.log("yyynnnn")
      }
    }
  return (
    <div className='review-form-container'>
      <h2>Step 2/4</h2>
      <p>A unique token is generated for security, allowing your payment information to be securely transmitted.</p>
      <div style={{height:"20px"}}></div>
      <div>{token}</div>
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