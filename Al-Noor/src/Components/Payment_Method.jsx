import React, { useState, useEffect } from "react";
import CryptoJS from 'crypto-js';
import { useLocation } from 'react-router-dom';


function Payment_Method() {
  const [HS_RequestHash, setHS_RequestHash] = useState("");
  const [authToken, setAuthToken] = useState('');
  const [transactionAmount, setTransactionAmount] = useState("100");
  const [transactionType, setTransactionType] = useState("");
  const [transactionReferenceNumber, setTransactionReferenceNumber] = useState("a");
  const location = useLocation();
  const { key } = location.state || {};
  const orderIDPrice = localStorage.getItem("online_order_payment");
  const parsedorderIDPrice = orderIDPrice ? JSON.parse(orderIDPrice) : [];

  useEffect(() => {
    
    

    const runButton = document.getElementById("run");
    const handleRunButton = (e) => {
      
      e.preventDefault();
      submitRequest('PageRedirectionForm');
      document.getElementById("PageRedirectionForm").submit();
    };

    runButton.addEventListener("click", handleRunButton);

    return () => {
      runButton.removeEventListener("click", handleRunButton);
    };
  }, []);

  const submitRequest = (formName) => {
    const form = document.getElementById(formName);
    let mapString = "";

    console.log(form)
    
    Array.from(form.elements).forEach((element) => {
      if (element.id) mapString += `${element.id}=${element.value}&`;
    });

    const key1 = document.getElementById("Key1").value;
    const key2 = document.getElementById("Key2").value;

    const encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(mapString.slice(0, -1)),
      CryptoJS.enc.Utf8.parse(key1),
      {
        iv: CryptoJS.enc.Utf8.parse(key2),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    
    

    document.getElementById("RequestHash").value = encrypted.toString()
    
    
   
      
    console.log(document.getElementById("RequestHash").value)
    console.log(document.getElementById("AuthToken").value)
    
  };
  

  return (
    
    <div className="review-form-container">

<h2>Step 3/4</h2>
      <p>Now you are ready to go on Bank Alflah Payment Gateway Portal.</p>
      <div style={{height:"20px"}}></div>
      {/* {authToken ? <p>Auth Token: {auth}</p> : <p>No Auth Token found</p>} */}
      {/* <h1>Received Params: auth = {key}</h1> */}
      {/* <h1>Received Params: Key = {key}</h1> */}
      {/* <h1>Received Params: Key = {key}</h1> */}
      
      <input id="Key1" name="Key1" type="hidden" value="cx29ScERgFbyD56R" />
      <input id="Key2" name="Key2" type="hidden" value="9621725557413686" />
    
      <h3>Page Redirection Request</h3>
      <form
        action="https://sandbox.bankalfalah.com/SSO/SSO/SSO"
        id="PageRedirectionForm"
        method="post"
      >
        <input id="AuthToken" name="AuthToken" type="text" value={key} />
        {/* onChange={(e) => {
            setAuthToken(e.target.value);
            console.log(e.target.value);
            document.getElementById("AuthToken").value = e.target.value;
          }} */}
        <input
          id="RequestHash"
          name="RequestHash"
          type="hidden"
          value=""
        />
        <input id="ChannelId" name="ChannelId" type="hidden" value="1001" />
        <input id="Currency" name="Currency" type="hidden" value="PKR" />
        <input id="IsBIN" name="IsBIN" type="hidden" value="0" />
        <input id="ReturnURL" name="ReturnURL" type="hidden" value="https://posti.shop" />
        <input id="MerchantId" name="MerchantId" type="hidden" value="28516" />
        <input id="StoreId" name="StoreId" type="hidden" value="040190" />
        <input id="MerchantHash" name="MerchantHash" type="hidden" value="OUU362MB1urrjTS9bIayIR7TTXNwf2yPbxc5OMqhewg=" />
        <input
          id="MerchantUsername"
          name="MerchantUsername"
          type="hidden"
          value="netuki"
        />
        <input
          id="MerchantPassword"
          name="MerchantPassword"
          type="hidden"
          value="QM0ZPOKRQqpvFzk4yqF7CA=="
        />
        <input
          id="TransactionTypeId"
          name="TransactionTypeId"
          type="hidden"
          value="3"
        />
        {/* <select
        id="TransactionTypeId"
        name="TransactionTypeId"
        value={transactionType}
        onChange={(e) => {
          setTransactionType(e.target.value);
          console.log(e.target.value);
        }}
        autoComplete="off"
      >
        <option value="">Select Transaction Type</option>
        <option value="1">Alfa Wallet</option>
        <option value="2">Alfalah Bank Account</option>
        <option value="3">Credit/Debit Card</option>
      </select> */}
         
        

        <input
          id="TransactionReferenceNumber"
          name="TransactionReferenceNumber"
          type="text"
          value={parsedorderIDPrice[0].id.toString()}
        />

        <input
          id="TransactionAmount"
          name="TransactionAmount"
          type="text"
          value={parsedorderIDPrice[0].price.toString()}
          
        />
        <button
          type="submit"
          className="btn btn-custon-four btn-danger"
          id="run"
        >
          RUN
        </button>
      </form>
    </div>
  );
}

export default Payment_Method;
