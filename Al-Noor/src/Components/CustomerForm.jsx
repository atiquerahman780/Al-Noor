import { useEffect, useState } from 'react';
import "./CustomerForm.css"
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

function CustomerForm() {
  const [savedShippingInformation, setSavedShippingInformation] = useLocalStorage("Shipping_Information", []);
  const savedShipping = JSON.parse(localStorage.getItem("Shipping_Information"));

  // State variables to hold form input values
  const [customerName, setCustomerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [customerCity, setCustomerCity] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (savedShipping && savedShipping.length) {
      setCustomerName(savedShipping[0].name || "");
      setContactNumber(savedShipping[0].contact || "");
      setCustomerCity(savedShipping[0].city || "");
      setCustomerAddress(savedShipping[0].address || "");
    }
  }, []);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    const newShippingInformation = {
      name: customerName,
      contact: contactNumber,
      city: customerCity,
      address: customerAddress,
    };
    setSavedShippingInformation([newShippingInformation]);
    navigate("/cart");
  };

  return (
    <div className="customer-form-container">
      <h2>Shipping Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter name"
            required
          />
        </div>

        <div className="form-group">
          <label>Contact Number:</label>
          <input
            type="tel"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder="Enter contact number"
            pattern="[0-9]{11}"
            required
          />
        </div>

        <div className="form-group">
          <label>City Name:</label>
          <input
            type="text"
            value={customerCity}
            onChange={(e) => setCustomerCity(e.target.value)}
            placeholder="Enter city"
            required
          />
        </div>

        <div className="form-group">
          <label>Your Address:</label>
          <textarea
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
            placeholder="Enter address"
            required
          />
        </div>

        <button type="submit">Add Shipping Address</button>
      </form>
    </div>
  );
}

export default CustomerForm;
