import React from 'react'
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { useEffect, useState } from 'react';

export default function ShippingAddress() {
  const [savedShippingInformation, setsavedShippingInformation] = useLocalStorage("Shipping_Information", []);
    const savedShipping = JSON.parse(localStorage.getItem("Shipping_Information"));
    const navigate = useNavigate();
   
  return (
    <div className="cart-container">
      <h2 >Shipping Address</h2>
      
      {savedShipping && savedShipping.length == 0 ? (
        <button onClick={() => navigate("/shipping_information")}>
        Add Shipping Information
      </button>

        
      ) : (
        <>
        <div style={{display:"flex",justifyContent :"space-between", margin:"10px", padding:"0px"}}>
        <p style={{ margin:"0px", padding:"0px"}} >Name: {savedShipping[0].name}</p>
        <button  onClick={() => navigate("/shipping_information")}>
        Edit
      </button>
        </div>
        
        <p style={{ margin:"10px", padding:"0px"}}>Contact: {savedShipping[0].contact}</p>
        <p style={{ margin:"10px", padding:"0px"}}>Shipping Address: {savedShipping[0].address}</p>
        </>
      )}
    </div>
  )
}
