import React from 'react'

 function Confirmation() {

    const params = new URLSearchParams(window.location.search);
  
    const token = params.get('AuthToken');
  return (
    <div>
      <Link to="https://posti.shop/contacts">
        <img className="cardimg" src="" alt="cart Image"  />
        {token}
        </Link>
    </div>
  )
}
export default Confirmation