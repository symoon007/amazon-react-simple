import React, { useState } from "react";
import Cart from "../Cart/Cart";
import { Link, useLoaderData } from "react-router-dom";
import ReviewItem from "../ReviewItem/ReviewItem";
import "./Orders.css";
import { deleteShoppingCart, removeFromDb } from "../../utilities/fakedb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";

const Orders = () => {
  const savedCart = useLoaderData();
  const [cart, setCart] = useState(savedCart);

  const handleRemoveCart = (id) => {
    const remainingCart = cart.filter((p) => p.id !== id);
    setCart(remainingCart);
    removeFromDb(id);
  };
  const handleClrCart = () => {
    setCart([]);
    deleteShoppingCart();
  };
  return (
    <div className="shop-container">
      <div className="review-container">
        {cart.map((product) => (
          <ReviewItem
            key={product.id}
            product={product}
            handleRemoveCart={handleRemoveCart}
          />
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart} handleClrCart={handleClrCart}>
          <Link to="/checkout">
            <button className="btn-proceed">
              <span>Proceed Checkout</span>
              <FontAwesomeIcon icon={faCreditCard}></FontAwesomeIcon>{" "}
            </button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Orders;
