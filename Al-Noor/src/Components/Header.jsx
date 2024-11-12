import { Link } from "react-router-dom";
import account_image from "../assets/images/account_Icon.png";
import "./Header.css";
import { useLocalStorage } from "./useLocalStorage";
function Header() {
  const [savedShippingInformation, setsavedShippingInformation] = useLocalStorage("Shipping_Information", []);
  
  return (
    <div className="wrapper">
      <div className="one">
      <pre>AL-NOOR</pre>
      </div>
      <div className="two">
      <Link to="../">
      <pre className="bar_space">DESIGHEE </pre>
        </Link>
        
        <Link to="../reviews">
        <pre className="bar_space"> REVIEWS </pre>
        </Link>
        
        <Link to="../cart">
        <pre className="bar_space"> CART
          {/* <sup id="Ccount">({savedProduct[0].quantity})</sup> */}
          </pre>
        </Link>
        
      </div>
      <div className="three">
      <Link to="../shipping_information">
        <img className="cardimg" src={account_image} alt="cart Image"  />
        </Link>
      </div>
    </div>
  );
}
export default Header;
