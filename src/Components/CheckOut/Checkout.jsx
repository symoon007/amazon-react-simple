import React from "react";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  return (
    <div>
      <h3>Checkout your Order here!!!!</h3>
    </div>
  );
};

export default Checkout;
