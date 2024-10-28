import React, { useState, useEffect } from "react";
import CryptoJS from 'crypto-js';

function Payment_Method() {
  const [HS_RequestHash, setHS_RequestHash] = useState("");
  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('AuthToken');
    if (token) setAuthToken(token);

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
  }, [authToken]);

  const submitRequest = (formName) => {
    const form = document.getElementById(formName);
    let mapString = "";

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

    setHS_RequestHash(encrypted.toString());
  };

  return (
    <div>
      {authToken ? <p>Auth Token: {authToken}</p> : <p>No Auth Token found</p>}
      
      <input id="Key1" name="Key1" type="hidden" value="cx29ScERgFbyD56R" />
      <input id="Key2" name="Key2" type="hidden" value="9621725557413686" />
    
      <h3>Page Redirection Request</h3>
      <form
        action="https://sandbox.bankalfalah.com/SSO/SSO/SSO"
        id="PageRedirectionForm"
        method="post"
      >
        <input id="AuthToken" name="AuthToken" value={authToken} readOnly />
        <input
          id="HS_RequestHash"
          name="HS_RequestHash"
          type="hidden"
          value={HS_RequestHash}
          readOnly
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
        <select
          id="TransactionTypeId"
          name="TransactionTypeId"
          defaultValue="3"
        >
          <option value="1">Alfa Wallet</option>
          <option value="2">Alfalah Bank Account</option>
          <option value="3">Credit/Debit Card</option>
        </select>

        <input
          id="TransactionReferenceNumber"
          name="TransactionReferenceNumber"
          placeholder="Order ID"
          type="text"
          defaultValue="a"
          autoComplete="off"
        />

        <input
          id="TransactionAmount"
          name="TransactionAmount"
          placeholder="Transaction Amount"
          type="text"
          defaultValue="100"
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
