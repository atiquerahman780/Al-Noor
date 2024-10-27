import React from 'react'
import Header from "./Header"
import ShoppingCart from './Cart_Items';
import CustomerForm from './CustomerForm.jsx';
import Payment_Method from './Payment_Method.jsx';
 function Contacts() {

  const savedProduct = JSON.parse(localStorage.getItem('product'));

if (savedProduct) {
  console.log(savedProduct.qan); // Accessing object properties
}
  return (
    <div>
      <Header/>
      
      <ShoppingCart/>
      <CustomerForm/>
      <Payment_Method/>
      
    </div>
  )
}
export default Contacts