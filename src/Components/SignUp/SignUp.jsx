//SignUp.jsx
import React, { useContext, useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import toast, { Toaster } from "react-hot-toast";
import Icon from "react-icons-kit";
import { AuthContext } from "../providers/AuthProviders";
import { sendEmailVerification } from "firebase/auth";

const SignUp = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState(eyeOff);
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(eyeOff);
  const { user, createUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const handlePasswordHide = (field) => {
    if (field === "password") {
      if (passwordType === "password") {
        setPasswordIcon(eye);
        setPasswordType("text");
      } else {
        setPasswordIcon(eyeOff);
        setPasswordType("password");
      }
    } else if (field === "confirmPassword") {
      if (confirmPasswordType === "password") {
        setConfirmPasswordIcon(eye);
        setConfirmPasswordType("text");
      } else {
        setConfirmPasswordIcon(eyeOff);
        setConfirmPasswordType("password");
      }
    }
  };
  const errorNotify = (value) => toast.error(value);
  const successNotify = (value) => toast.success(value);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    if (formData.password.length < 6 || formData.passwordConfirm.length < 6) {
      setError(errorNotify("Password Should be at leat 6 characters!"));
      return;
    } else if (formData.password !== formData.passwordConfirm) {
      setError(errorNotify("Password did't match!"));

      return;
    }
    createUser(formData.email, formData.password)
      .then((result) => {
        setSuccess(successNotify("User Created Successfully!"));
        setFormData({
          email: "",
          password: "",
          passwordConfirm: "",
        });
        sendMailVerification(result.user);
        console.log("call mail verify func:", sendMailVerification);
      })
      .catch((error) => {
        setError(errorNotify("User Created Failed! Try again"));
        console.error(error.message);
      });
    console.log("create user: ", createUser);
  };
  const sendMailVerification = (user) => {
    sendEmailVerification(user)
      .then(() => {
        alert("Verify your email!");
        console.log("User mail verifiy func : ", user);
        return;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="form-container">
      <div></div>
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

      <Toaster />
    </div>
  );
};

export default SignUp;
