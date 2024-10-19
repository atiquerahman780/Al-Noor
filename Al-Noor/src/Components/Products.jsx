import Product_Image from "../assets/images/Ghee_image.jpg";
import Incredecrement from "./Incre-decrement";
import "./Products.css";
import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

function Products() {
  const [data, setData] = useState([]);
  const [savedProducts, setsavedProducts] = useLocalStorage("Cart_items", []);

  useEffect(() => {
    // Fetch data from the backend
    fetch("http://localhost:5000/getData") // Assuming the backend runs on port 5000
      .then((response) => response.json()) // Parse the JSON data from the response
      .then((dataArray) => {
        console.log("Fetched Data:", dataArray); // Log the data to see what we get
        setData(dataArray); // Store the fetched data in state
      })
      .catch((error) => console.error("Error fetching data:", error)); // Handle errors
  }, []);

  if (data === null || data.length === 0) {
    return <div>No data available.</div>;
  }

  function Cart(item) {
    return (
      <div className="Product_Cart" key={item._id}>
        <img className="Product_Image" src={Product_Image} alt="Loading..." />

        <h2 className="P_title">Desi Ghee</h2>
        <span className="P_gram">{item.quantity}gm</span>

        <h4 className="P_price">RS. {item.price}</h4>
        <p className="product_description">
          Desi Ghee is made from the pure cream of a blend of buffalo and cow
          milk.
        </p>

        <div className="plus_minus">
          <Incredecrement id={item._id} />
        </div>

        <h4 className="heading_margin_remove">
          <div className="buttons">
            <button
              className="Cart_button"
              onClick={() => {
                

                
                  
                  const savedProducts = JSON.parse(localStorage.getItem("Cart_items"));

                  const productExists = savedProducts.some(
                    (product) => product.id === item._id
                  );
                  

                  if (!productExists) {
                    
                    const quantite = JSON.parse(localStorage.getItem("count"+item._id));
                
                    const newProduct = {
                      id: item._id,
                      name: item.name,
                      price: item.price,
                      ml:item.quantity,
                      quantity: quantite,
                    };
                    setsavedProducts([...savedProducts, newProduct]);
                    
                  } else {
                    console.log(
                      "Product with this ID already exists in localStorage."
                    );
                  }
                  
              }}
            >
              Add to Cart{" "}
            </button>
          </div>
        </h4>
        <div className="buttons">
          <button
            className="Buy_now_button"
            onClick={() => {
              const newProduct = {
                id: item._id,
                name: "Olive Oil",
                price: "700",
                quantity: "1L",
              };
              const savedProducts = JSON.parse(
                localStorage.getItem("products")
              );

              const productExists = savedProducts.some(
                (product) => product.id === newProduct.id
              );
              console.log(productExists);

              if (!productExists) {
                setProducts([...products, newProduct]);
                console.log("Product saved:");
              } else {
                console.log(
                  "Product with this ID already exists in localStorage."
                );
              }
            }}
          >
            BUY IT NOW
          </button>
        </div>
      </div>
    );
  }

  return <div className="Card_Display">{data.map((item) => Cart(item))}</div>;
}

export default Products;
