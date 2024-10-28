import React, { useState, useEffect } from "react";
import CryptoJS from 'crypto-js';

function Payment_Method() {
  const [HS_RequestHash, setHS_RequestHash] = useState("");
  const [authToken, setAuthToken] = useState('');
  const [transactionAmount, setTransactionAmount] = useState("100");
  const [transactionType, setTransactionType] = useState("");
  const [transactionReferenceNumber, setTransactionReferenceNumber] = useState("a");

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

    // const key1 = document.getElementById("Key1").value;
    // const key2 = document.getElementById("Key2").value;

    // const encrypted = CryptoJS.AES.encrypt(
    //   CryptoJS.enc.Utf8.parse(mapString.slice(0, -1)),
    //   CryptoJS.enc.Utf8.parse(key1),
    //   {
    //     iv: CryptoJS.enc.Utf8.parse(key2),
    //     mode: CryptoJS.mode.CBC,
    //     padding: CryptoJS.pad.Pkcs7,
    //   }
    // );

    const params = new URLSearchParams(window.location.search);
    const token = params.get('AuthToken');
    

    document.getElementById("RequestHash").value = "hAYl0F2Gkz8lRFyYIndJIopCPxRT8DgLe0FqtCPj99EbnbIgxskEhYjSZ7hiGkZ+696ErRukAZbk/Ufp/sGKMrvAaryzxM8GgR4/McGra5jWEebh90fVH3YR6JC6PTHitsyLkDVO9qs7Cnep2OGbN6MHckZj5eB2ahvgHWn4G+4orxTfhGEOQOQOLIB7s/abVKz9dQEcnVevo0NHidDYQzfNpmucXImhRxvttLYmKbxCmwASatGLURUypPGH37V0b7vmAL5HhEN1QFQUjt9xZooUW/xw18+Hr0WcshVXKqhwrsXeyqTQ5dhIq4hFdj/TR63ligqLB1TkysyvQNBUJNz6Q2Ud7Ba5bOSqyPufvAoLuinNuCFQZvd4/kUnMjU8ZhpnjG8gsc2yBIhVYUVA32IgWQ6Zgo44Ymd9+/EiXSg=";
    document.getElementById("AuthToken").value = token.toString();
    
    console.log(document.getElementById("RequestHash").value)
    console.log(document.getElementById("AuthToken").value)
  
    
  };

  return (
    <div>
      {authToken ? <p>Auth Token: {authToken}</p> : <p>No Auth Token found</p>}
      
      {/* <input id="Key1" name="Key1" type="hidden" value="cx29ScERgFbyD56R" />
      <input id="Key2" name="Key2" type="hidden" value="9621725557413686" /> */}
    
      <h3>Page Redirection Request</h3>
      <form
        action="https://sandbox.bankalfalah.com/SSO/SSO/SSO"
        id="PageRedirectionForm"
        method="post"
      >
        <input id="AuthToken" name="AuthToken" type="hidden" value="" />
        <input
          id="RequestHash"
          name="RequestHash"
          type="hidden"
          value=""
        />
        <input id="ChannelId" name="ChannelId" type="hidden" value="1001" />
        <input id="Currency" name="Currency" type="hidden" value="PKR" />
        <input id="IsBIN" name="IsBIN" type="hidden" value="1" />
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
          type="hidden"
          value="asdf"
        />

        <input
          id="TransactionAmount"
          name="TransactionAmount"
          type="hidden"
          value="100"
          
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
