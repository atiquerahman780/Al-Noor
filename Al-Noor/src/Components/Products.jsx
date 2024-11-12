import Product_Image from "../assets/images/ghee_img.png";
import downArrow_Img from "../assets/images/down-arrow.png";
import Incredecrement from "./Incre-decrement";
import "./Products.css";
import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import whatsapp_image from '../assets/images/whatsapp.png'
import facebook_image from '../assets/images/facebook.png'
import youtube_image from '../assets/images/youtube.png'


function Products() {
  const [selectedItemId, setSelectedItemId] = useState(null);

    const handleClick = (id) => {
      // Toggle the item’s detail view
      setSelectedItemId(selectedItemId === id ? null : id);
    };
  const [data, setData] = useState([]);
  const [savedProducts, setsavedProducts] = useLocalStorage("Cart_items", []);

  useEffect(() => {
    // Fetch data from the backend
    fetch("https://posti.shop/getData") // Assuming the backend runs on port 5000
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
    const items = [
      { id: item._id+1, title: 'DESCRIPTION', details: <p>Desi Ghee, a nutrient-rich clarified butter, supports digestion and wellness, with additional benefits for postpartum recovery by aiding energy levels and immunity.</p> },
      { id: item._id+2, title: 'PRODUCT DETAIL', details: <p>Desi Ghee is a premium, traditional clarified butter rich in healthy fats, essential vitamins, and nutrients.</p> },
      { id: item._id+3, title: 'SHIPMENTS AND RETURNS', details:<p>Your order will be delivered by Leopard Courier. Both cash on delivery and card payment options are available, and returns can be made at any nearest Leopard office.</p>  },
    ];
    
    return (
      
      // key={item._id}
      
      <div className="Product_Cart" >
        <div className="image_area">
        <img className="Product_Image" src={Product_Image} alt="Loading..." />
        </div>
<div className="Detail">
        <h2 className="P_title">{item.name}</h2>
        <span className="P_gram">{item.quantity}gm</span>

        <h2 className="P_price">RS. {item.price}</h2>
        {/* <p className="product_description">
          Desi Ghee is made 
          milk.
        </p> */}

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
                    alert("Product Added to Cart.");
                    
                  } else {
                    alert("Product already exists in Cart.");
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
        {/* <div className="buttons">
          <button
            className="Buy_now_button"
            
          >
            BUY IT NOW
          </button>
          
        </div> */}
        <div className="items" >
        {items.map((ite) => (
          <>
        <div  className="design" key={ite.id} onClick={() => handleClick(ite.id)}>
          <span className="item_design">{ite.title}</span>
          <img className="arrowImage" src={downArrow_Img} alt="arro" />
          </div>
          <div className="new">
          {/* Show details only if the item is clicked */}
          {selectedItemId === ite.id && <dev >{ite.details}</dev>}
          </div>
          </>
      ))}
        </div>
        <div>
          <img className="SImage" src={whatsapp_image} alt="" />
          <img className="SImage" src={facebook_image} alt="" />
          <img className="SImage" src={youtube_image} alt="" />
        </div>
      </div>
      </div>
      
    );
  }

  return <div className="Card_Display">{data.map((item) => Cart(item))}</div>;
}

export default Products;
