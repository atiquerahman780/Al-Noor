import React, { useState } from "react";
import axios from 'axios';
import "./CustomerForm.css"


function CustomerForm() {
  // State variables to hold form input values
  const [customerName, setCustomerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [customerCity, setCustomerCity] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

// Function to handle form submission
const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
  
    // Create an object for customer details
    const customerDetails = {
      name: customerName,
      contact: contactNumber,
      city: customerCity,
      address: customerAddress,
    };
  
    // Get the saved cart items from localStorage
    const savedItems = localStorage.getItem("Cart_items");
    const parsedItems = JSON.parse(savedItems);
  
    // Check if the cart is empty or not
    if (!parsedItems || parsedItems.length === 0) {
      alert("Kindly ADD Product to Cart!");
    } else {
      // Prepare order data object to send to the backend
    //   const orderData = {
    //     customerDetails,
    //     parsedItems,
    //   };
  
    //   console.log(orderData); // Log the order data for debugging



      const orderData = {
        customerDetail: {
          name: customerName,
          contactNo: contactNumber,
          city: customerCity,
          address: customerAddress,
        },
        products: parsedItems,  // Ensure this is an array of product objects with proper structure
      };
      console.log(orderData);
  
      // Send order data to the backend using Axios
      axios
        .post("http://localhost:5000/submitOrder", orderData)
        .then((response) => {
          console.log("Order submitted:", response.data);
          alert("Order submitted successfully");
        })
        .catch((error) => {
          console.error("Error submitting order:", error);
          alert("Error submitting order");
        });
  
      // Store customer data in localStorage (optional)
      localStorage.setItem("Customer_Details", JSON.stringify(customerDetails));
  
      // Clear the form after submission
      setCustomerName("");
      setContactNumber("");
      setCustomerCity("");
      setCustomerAddress("");
  
      alert("Form submitted successfully!");
    }
  };
  

  return (
    <div className="customer-form-container">
      <h2>Customer Information</h2>
      <form onSubmit={handleSubmit}>
        {/* Customer Name */}
        <div className="form-group">
          <label>Customer Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter customer name"
            required
          />
        </div>

        {/* Contact Number */}
        <div className="form-group">
          <label>Contact Number:</label>
          <input
            type="tel"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder="Enter contact number"
            pattern="[0-9]{11}" // Assuming 11 digits contact number
            required
          />
        </div>

        {/* Customer City */}
        <div className="form-group">
          <label>Customer City:</label>
          <input
            type="text"
            value={customerCity}
            onChange={(e) => setCustomerCity(e.target.value)}
            placeholder="Enter customer city"
            required
          />
        </div>

        {/* Customer Address */}
        <div className="form-group">
          <label>Customer Address:</label>
          <textarea
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
            placeholder="Enter customer address"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CustomerForm;
