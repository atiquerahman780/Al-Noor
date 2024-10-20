
import { Link } from "react-router-dom";
import logo from "../assets/images/acon.webp";
import cart_image from "../assets/images/cart.png";
import "./Header.css";

function Header() {
  return (
    <div className="wrapper">
      <div className="one">
        <div className="Circle_Area">
          <img className="logo_img" src={logo} alt="Logo" />
        </div>
      </div>
      <div className="two">
        <span>Al-Noor Desi Ghee</span>
      </div>
      <div className="three">
      <Link to="http://posti.shop/contacts">
        <img className="cardimg" src={cart_image} alt="cart Image"  />
        </Link>
      </div>
    </div>
  );
}
export default Header;
