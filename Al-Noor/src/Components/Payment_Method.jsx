import React from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import CryptoJS from 'crypto-js';

function Payment_Method() {
  const [HS_RequestHash, setHS_RequestHash] = useState("");
  const [Auth_token, setAuth_token] = useState("");
  const [HS_StoreId, setHS_StoreId] = useState("");
  const [HS_MerchantHash, setHS_MerchantHash] = useState("");
  const [HS_MerchantUsername, setHS_MerchantUsername] = useState("");
  const [HS_MerchantPassword, setHS_MerchantPassword] = useState("");
  const [HS_TransactionReferenceNumber, setHS_TransactionReferenceNumber] = useState("");

  const [transactionType, setTransactionType] = useState('');
  const [transactionReferenceNumber, setTransactionReferenceNumber] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');
  document.cookie = "cookieName1=cookieValue1; SameSite=None; Secure";
  document.cookie = "cookieName2=cookieValue2; SameSite=Strict; Secure";
  function handshake() {
    console.log("function run");
  }

  useEffect(() => {
    const handshakeButton = document.getElementById("handshake");
    const runButton = document.getElementById("run");
    console.log("ssssssssssssssssss")
    const handelrunButton = (e) => {
        e.preventDefault(); 
        submitRequest('PageRedirectionForm'); // Replace this with your function logic
        document.getElementById("PageRedirectionForm").submit();
    };

    const handleHandshakeClick = (e) => {
      e.preventDefault();
      handshakeButton.setAttribute("disabled", "disabled");
      submitRequest("HandshakeForm");

      if (document.getElementById("HS_IsRedirectionRequest").value === "1") {
        document.getElementById("HandshakeForm").submit();
      }
      else {
        const myData = {
          HS_MerchantId: document.getElementById("HS_MerchantId").value,
          HS_StoreId: document.getElementById("HS_StoreId").value,
          HS_MerchantHash: document.getElementById("HS_MerchantHash").value,
          HS_MerchantUsername: document.getElementById("HS_MerchantUsername").value,
          HS_MerchantPassword: document.getElementById("HS_MerchantPassword").value,
          HS_IsRedirectionRequest: document.getElementById("HS_IsRedirectionRequest").value,
          HS_ReturnURL: document.getElementById("HS_ReturnURL").value,
          HS_RequestHash: document.getElementById("HS_RequestHash").value,
          HS_ChannelId: document.getElementById("HS_ChannelId").value,
          HS_TransactionReferenceNumber: document.getElementById("HS_TransactionReferenceNumber").value,
        };

        fetch("https://sandbox.bankalfalah.com/HS/HS/HS", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(myData).toString(),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data && data.success === "true") {
              document.getElementById("AuthToken").value = data.AuthToken;
              document.getElementById("ReturnURL").value = data.ReturnURL;
              alert("Success: Handshake Successful");
            } else {
              alert("Error: Handshake Unsuccessful");
            }
          })
          .catch((error) => {
            alert("Error: An error occurred");
            console.error(error);
          })
          .finally(() => {
            handshakeButton.removeAttribute("disabled");
          });
      }
    };

    handshakeButton.addEventListener("click", handleHandshakeClick);
    runButton.addEventListener("click",handelrunButton);

    // Cleanup listener on component unmount
    return () => {
        handshakeButton.removeEventListener("click", handleHandshakeClick);
        runButton.removeEventListener("click",handelrunButton)
    }
  }, []);

  const submitRequest = (formName) => {
    const form = document.getElementById(formName);
    let mapString = "";

    Array.from(form.elements).forEach((element) => {
      if (element.id) {
        mapString += `${element.id}=${element.value}&`;
      }
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

    document.getElementById("HS_RequestHash").value = encrypted.toString();
    
    
    console.log(encrypted.toString())
  };

  return (
    <div>
      <script
        src="https://code.jquery.com/jquery-1.12.4.min.js"
        integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="
        crossOrigin="anonymous"
      ></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js"></script>

      <input id="Key1" name="Key1" type="hidden" value="cx29ScERgFbyD56R" />
      <input id="Key2" name="Key2" type="hidden" value="9621725557413686" />
      



      



      <form
       action="https://sandbox.bankalfalah.com/HS/HS/HS"
       id="HandshakeForm"
      method="post"
      >
      <input
        id="HS_RequestHash"
        name="HS_RequestHash"
        type="hidden"
        value={HS_RequestHash}
        onChange={(e) => setHS_RequestHash(e.target.value)}
      />
      <input
        id="HS_IsRedirectionRequest"
        name="HS_IsRedirectionRequest"
        type="hidden"
        value="1"
      />
      <input
        id="HS_ChannelId"
        name="HS_ChannelId"
        type="hidden"
        value="1001"
      />
      <input
        id="HS_ReturnURL"
        name="HS_ReturnURL"
        type="hidden"
        value="https://posti.shop/contacts"
        
      />
      <input
        id="HS_MerchantId"
        name="HS_MerchantId"
        type="hidden"
        value="28516"
      />
      <input
        id="HS_StoreId"
        name="HS_StoreId"
        type="hidden"
        value="040190"
        
      />
      <input
        id="HS_MerchantHash"
        name="HS_MerchantHash"
        type="hidden"
        value="OUU362MB1urrjTS9bIayIR7TTXNwf2yPbxc5OMqhewg="
        
      />
      <input
        id="HS_MerchantUsername"
        name="HS_MerchantUsername"
        type="hidden"
        value="netuki"
        
      />
      <input
        id="HS_MerchantPassword"
        name="HS_MerchantPassword"
        type="hidden"
        value="QM0ZPOKRQqpvFzk4yqF7CA=="
        
      />
      <input
        id="HS_TransactionReferenceNumber"
        name="HS_TransactionReferenceNumber"
        type="text"
        autoComplete="off"
        placeholder="Order ID"
        value={HS_TransactionReferenceNumber}
        onChange={(e) => {

            setHS_TransactionReferenceNumber(e.target.value) 
            console.log(e.target.value)
        } 
        }
      />
      <button
         type="submit"
        className="btn btn-custon-four btn-danger"
        id="handshake"
        
       
      >
        
        Handshake
      </button>
    </form>

      <h3>Page Redirection Request</h3>
      <form
        action="https://sandbox.bankalfalah.com/SSO/SSO/SSO"
        id="PageRedirectionForm"
        method="post"
        noValidate="noValidate"
      >
        <input id="AuthToken" name="AuthToken" value={Auth_token} 
        onChange={(e) => {
          setAuth_token(e.target.value)
          console.log(e.target.value)}} />
        <input id="Request_Hash" name="Request_Hash" value="hAYl0F2Gkz8lRFyYIndJIopCPxRT8DgLe0FqtCPj99EbnbIgxskEhYjSZ7hiGkZ+696ErRukAZbk/Ufp/sGKMrvAaryzxM8GgR4/McGra5jWEebh90fVH3YR6JC6PTHitsyLkDVO9qs7Cnep2OGbN6MHckZj5eB2ahvgHWn4G+4orxTfhGEOQOQOLIB7s/abVKz9dQEcnVevo0NHidDYQzfNpmucXImhRxvttLYmKbxCmwASatGLURUypPGH37V0b7vmAL5HhEN1QFQUjt9xZooUW/xw18+Hr0WcshVXKqhwrsXeyqTQ5dhIq4hFdj/TR63ligqLB1TkysyvQNBUJNz6Q2Ud7Ba5bOSqyPufvAoLuinNuCFQZvd4/kUnMjU8TYnoHlOvFMOgcdOYVAUlZfcy/m+sZUjO9QbiuXiURFo="/>
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
        <select
        id="TransactionTypeId"
        name="TransactionTypeId"
        value={transactionType}
        onChange={(e) => {
          setTransactionType(e.target.value)
          console.log(e.target.value)}
        } 
      >
        <option value="">Select Transaction Type</option>
        <option value="1">Alfa Wallet</option>
        <option value="2">Alfalah Bank Account</option>
        <option value="3">Credit/Debit Card</option>
      </select>

      <input
        id="TransactionReferenceNumber"
        name="TransactionReferenceNumber"
        placeholder="Order ID"
        type="text"
        value={transactionReferenceNumber}
        onChange={(e) => {

          setTransactionReferenceNumber(e.target.value)
          console.log(e.target.value)
        }}
        autoComplete="off"
      />

      <input
        id="TransactionAmount"
        name="TransactionAmount"
        placeholder="Transaction Amount"
        type="text"
        value={transactionAmount}
        onChange={(e) => {setTransactionAmount(e.target.value)
          console.log(e.target.value)
        }}
        autoComplete="off"
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
