import React, { useState, useEffect } from "react";
import "./Cart_Items.css"; // Assuming you have some CSS for styling

function ShoppingCart() {


   
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Get saved items from local storage
        const savedItems = localStorage.getItem("Cart_items");
    
        const parsedItems = JSON.parse(savedItems);
        setCartItems(parsedItems)
       
      }, []);



  

  // Function to update the quantity of an item
  const updateQuantity = (id, increment) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + increment }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("Cart_items", JSON.stringify(updatedCart));
  };

  // Function to remove an item from the cart
  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("Cart_items", JSON.stringify(updatedCart));
  };

  // Calculate total price of items in the cart
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2 >Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-details">
                  <h3 className="head">{item.name}
                    <span> ({item.ml}ml)</span>
                  </h3>
                  <p>Price: Rs. {item.price}</p>
                  <p>Total: Rs. {item.price * item.quantity}</p>
                </div>
                <div className="cart-controls">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  <button className="remove-btn" onClick={() => removeItem(item.id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h3>Total Price: Rs. {totalPrice}</h3>
            {/* <button className="checkout-btn">Checkout</button> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
