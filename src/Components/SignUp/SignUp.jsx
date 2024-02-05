import React, { useContext, useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import toast, { Toaster } from "react-hot-toast";
import Icon from "react-icons-kit";
import { AuthContext } from "../providers/AuthProviders";
import { sendEmailVerification } from "firebase/auth";

// Component for user sign-up
const SignUp = () => {
  // State variables for error, success messages, password visibility, and icons
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState(eyeOff);
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(eyeOff);

  // Accessing user and createUser function from AuthContext
  const { user, createUser } = useContext(AuthContext);

  // State variable for form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  // Function to toggle password visibility
  const handlePasswordHide = (field) => {
    if (field === "password") {
      setPasswordType((prevType) =>
        prevType === "password" ? "text" : "password"
      );
      setPasswordIcon((prevIcon) => (prevIcon === eye ? eyeOff : eye));
    } else if (field === "confirmPassword") {
      setConfirmPasswordType((prevType) =>
        prevType === "password" ? "text" : "password"
      );
      setConfirmPasswordIcon((prevIcon) => (prevIcon === eye ? eyeOff : eye));
    }
  };

  // Function to show error notification
  const errorNotify = (value) => toast.error(value);

  // Function to show success notification
  const successNotify = (value) => toast.success(value);

  // Function to handle input change
  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Function to handle user signup
  const handleSignup = (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    if (formData.password.length < 6 || formData.passwordConfirm.length < 6) {
      setError(errorNotify("Password should be at least 6 characters!"));
      return;
    } else if (formData.password !== formData.passwordConfirm) {
      setError(errorNotify("Passwords don't match!"));
      return;
    }
    createUser(formData.email, formData.password)
      .then((result) => {
        setSuccess(successNotify("User created successfully!"));
        setFormData({
          email: "",
          password: "",
          passwordConfirm: "",
        });
        sendMailVerification(result.user);
      })
      .catch((error) => {
        setError(errorNotify("User creation failed! Try again"));
        console.error(error.message);
      });
  };

  // Function to send email verification
  const sendMailVerification = (user) => {
    sendEmailVerification(user)
      .then(() => {
        alert("Verify your email!");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // JSX return for the SignUp component
  return (
    <div className="form-container">
      <h2 className="form-title">Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={formData.email}
            name="email"
            id="email"
            required
            placeholder="Email"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-control icon-set">
          <label htmlFor="password">New Password</label>
          <input
            type={passwordType}
            value={formData.password}
            name="password"
            id="password"
            required
            placeholder="Password"
            onChange={handleInputChange}
          />
          <span
            className="eye-icon"
            onClick={() => handlePasswordHide("password")}
          >
            <Icon icon={passwordIcon} size={30} />
          </span>
        </div>
        <div className="form-control icon-set">
          <label htmlFor="passwordConfirm">Re-type New Password</label>
          <input
            type={confirmPasswordType}
            value={formData.passwordConfirm}
            name="passwordConfirm"
            id="passwordConfirm"
            required
            placeholder="Password"
            onChange={handleInputChange}
          />
          <span
            className="eye-icon"
            onClick={() => handlePasswordHide("confirmPassword")}
          >
            <Icon icon={confirmPasswordIcon} size={30} />
          </span>
        </div>
        <input className="btn-submit" type="submit" value="Sign Up" />
      </form>
      <p className="site-link">
        <small>
          Already have an account? <Link to="/login">Login</Link>{" "}
        </small>
      </p>
      {/* Toast component for notifications */}
      <Toaster />
    </div>
  );
};

export default SignUp;
