import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProceedToPay.css";
import { useState } from "react";

export default function ProceedToPay() {
  const [selectedMethod, setSelectedMethod] = useState("");
  const navigate = useNavigate();
  function checkout() {
    
    // Get the data from localStorage with the key "Cart_items"
    const cartItems = localStorage.getItem("Cart_items");
    const shippingAddress = localStorage.getItem("Shipping_Information");

    // Check if data exists and parse it as JSON
    const parsedCartItems = cartItems ? JSON.parse(cartItems) : [];
    const parsedshippingAddress = shippingAddress
      ? JSON.parse(shippingAddress)
      : [];
    if (parsedshippingAddress.length === 0) {
      console.log("Add shipping Address");
      alert("Add shipping Address");
    } else if (parsedCartItems.length === 0) {
      console.log("Add cart item");
      alert("Add cart item");
    } else {

      

      const uniqueID = Date.now();
      const order = {key:"q"+
        parsedCartItems[0].quantity + "no."+
        parsedshippingAddress[0].contact+"id"+uniqueID}
        ;
      
      // const data = { key: 'value', otherParam: 123 };  // Example data to pass
  navigate('/run', { state: { key: order.key} });
    // navigate("/run",  order );
    }
  }
  async function confirmOrder() {
    // Get the data from localStorage with the key "Cart_items"
    const cartItems = localStorage.getItem("Cart_items");
    const shippingAddress = localStorage.getItem("Shipping_Information");

    // Check if data exists and parse it as JSON
    const parsedCartItems = cartItems ? JSON.parse(cartItems) : [];
    const parsedshippingAddress = shippingAddress
      ? JSON.parse(shippingAddress)
      : [];
    if (parsedshippingAddress.length === 0) {
      console.log("Add shipping Address");
      alert("Add shipping Address");
    } else if (parsedCartItems.length === 0) {
      console.log("Add cart item");
      alert("Add cart item");
    } else {
      const order =
        "quantity" +
        parsedCartItems[0].quantity +
        "ml" +
        parsedCartItems[0].ml +
        "price" +
        parsedCartItems[0].price +
        parsedshippingAddress[0].address +
        parsedshippingAddress[0].name +
        parsedshippingAddress[0].city +
        parsedshippingAddress[0].contact;
      console.log(order);
      const orderData = {
        customerDetail: {
          name: parsedshippingAddress[0].name,
          contact: parsedshippingAddress[0].contact,
          city: parsedshippingAddress[0].city,
          address: parsedshippingAddress[0].address,
        },
        products: parsedCartItems.map((item) => ({
          id: item.id, // Assuming you have an 'id' field
          name: item.name, // Assuming you have a 'name' field
          quantity: item.quantity,
          price: item.price,
        })),
      };
      try {
        const response = await fetch("http://localhost:5000/submitOrder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });

        const data = await response.json();
        console.log("Order submitted:", data);
        alert("Order added successfully");
      } catch (error) {
        console.error("Error submitting order:", error);
        alert("Failed to submit order");
      }
    }
  }
  return (
    <div className="cart-containe">
      <h2>Payment Methods</h2>
      <div className="payment-option">
        <label>
          <input
            className="dot"
            type="radio"
            value="cash"
            checked={selectedMethod === "cash"}
            onChange={() => setSelectedMethod("cash")}
          />
          Cash on Delivery
        </label>
        <label>
          <input
            className="dot"
            type="radio"
            value="card"
            checked={selectedMethod === "card"}
            onChange={() => setSelectedMethod("card")}
          />
          Card Payment
        </label>
      </div>

      <div className="payment-info" style={{ margin: "10px" }}>
        {selectedMethod === "cash" && (
          <>
            <p>
              With Cash on Delivery, you’ll pay when the order arrives at your
              door.
            </p>
            <button onClick={confirmOrder} className="payment-btn">
              Confirm Order
            </button>
          </>
        )}
        {selectedMethod === "card" && (
          <>
            <p>
              With Card Payment, you can securely pay online using your debit or
              credit card.
            </p>
            <button onClick={checkout} className="payment-btn">
              Check Out
            </button>
          </>
        )}
      </div>
    </div>
  );
}
