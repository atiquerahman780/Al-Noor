import React from 'react'
import ShoppingCart from './Cart_Items.jsx';
import CustomerForm from './CustomerForm.jsx';
import Payment_Method from './Payment_Method.jsx';
import ShippingAddress from './ShippingAddress.jsx';
import ProceedToPay from './ProceedToPay.jsx';
 function Cart() {

  const savedProduct = JSON.parse(localStorage.getItem('product'));

if (savedProduct) {
  console.log(savedProduct.qan); // Accessing object properties
}
  return (
    <div>
      <ShoppingCart/>
      <ShippingAddress/>
      <ProceedToPay/>
      {/* <Payment_Method/> */}
      
    </div>
  )
}
export default Cart