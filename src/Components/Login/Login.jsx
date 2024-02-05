import React, { useContext, useState } from "react";
import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProviders";
import toast, { Toaster } from "react-hot-toast";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import Icon from "react-icons-kit";

// Component for user login
const Login = () => {
  // Accessing signIn function from AuthContext
  const { signIn } = useContext(AuthContext);

  // State variables for error, success messages, password visibility, and icon
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  // State variable for form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Function to toggle password visibility
  const handlePasswordHide = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
    setIcon((prevIcon) => (prevIcon === eye ? eyeOff : eye));
  };

  // Hooks for navigation
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Function to handle input change
  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Function to show error notification
  const errorNotify = (value) => toast.error(value);

  // Function to show success notification
  const successNotify = (value) => toast.success(value);

  // Function to handle user login
  const handleLogin = (event) => {
    event.preventDefault();

    signIn(formData.email, formData.password)
      .then((result) => {
        const loggedUser = result.user;
        if (loggedUser && loggedUser.emailVerified) {
          // User is logged in and email is verified
          setSuccess(successNotify("Log in successful!"));
          setFormData({
            email: "",
            password: "",
          });
          navigate(from, { replace: true });
        } else {
          // User is not logged in or email is not verified
          if (loggedUser && !loggedUser.emailVerified) {
            setError(errorNotify("Email is not verified. Check your email."));
          } else {
            setError(errorNotify("Invalid email or password!"));
          }
        }
      })
      .catch((error) => {
        setError(errorNotify("Invalid email or password!"));
      });
  };

  // JSX return for the Login component
  return (
    <div className="form-container">
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            name="email"
            id="email"
            required
            placeholder="Email"
          />
        </div>
        <div className="form-control icon-set">
          <label htmlFor="password">Password</label>
          <input
            value={formData.password}
            onChange={handleInputChange}
            type={passwordType}
            name="password"
            id="password"
            required
            placeholder="Password"
          />
          <span className="eye-icon" onClick={handlePasswordHide}>
            <Icon icon={icon} size={30} />
          </span>
        </div>
        <input className="btn-submit" type="submit" value="Login" />
      </form>
      <p className="site-link">
        <small>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </small>
      </p>
      {/* Toast component for notifications */}
      <Toaster />
    </div>
  );
};

export default Login;
