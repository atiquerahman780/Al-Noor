import React from "react";
import { useState, useEffect} from "react";
import CryptoJS from 'crypto-js';
function Run() {
  //const [HS_RequestHash, setHS_RequestHash] = useState("");
  const [HS_TransactionReferenceNumber, setHS_TransactionReferenceNumber] =
    useState("");
  // use Effect
  useEffect(() => {
    const handshakeButton = document.getElementById("handshake");
    console.log("ssssssssssssssssss");
    // console.log(HS_RequestHash)
    
    

    
    const handleHandshakeClick = (e) => {
      // console.log(HS_RequestHash)
      e.preventDefault();
      handshakeButton.setAttribute("disabled", "disabled");
      submitRequest("HandshakeForm");

      if (document.getElementById("HS_IsRedirectionRequest").value === "1") {
        document.getElementById("HandshakeForm").submit();
      } 
    };
    handshakeButton.addEventListener("click", handleHandshakeClick);
    // Cleanup listener on component unmount
    return () => {
      handshakeButton.removeEventListener("click", handleHandshakeClick);
    };
  }, []);
  

  // encription
  const submitRequest = (formName) => {
    
    const form = document.getElementById(formName);
    let mapString = "";

    console.log(form)
    
    // console.log(HS_RequestHash)
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

    console.log(encrypted.toString());
    console.log(document.getElementById("HS_RequestHash").value)
  
    };
  return (
    <div>
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
          value=""
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
        <input id="HS_StoreId" name="HS_StoreId" type="hidden" value="040190" />
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
            setHS_TransactionReferenceNumber(e.target.value);
            console.log(e.target.value);
          }}
        />
        <button
          type="submit"
          className="btn btn-custon-four btn-danger"
          id="handshake"
        >
          Handshake
        </button>
      </form>
    </div>
  );
}
export default Run;
