import "./Header.css";
import logo from "../../images/Logo.svg";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProviders";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav className="header">
      <img src={logo} alt="" />
      <div>
        <Link to="/">Shop</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/inventory">Manage Inventory</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
      {user && (
        <span className="user-profile">
          User Email ID : {user.email}
          <button className="btn-signout" onClick={handleLogOut}>
            Sign Out
          </button>
        </span>
      )}
    </nav>
  );
};

export default Header;
