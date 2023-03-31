import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Product = (props) => {
  const { name, price, ratings, seller, img, quantity } = props.product;

  const handleProduct = props.handleProduct;
  return (
    <div className="product">
      <img src={img} alt="" />
      <div className="p-info">
        <h6 className="p-name">{name}</h6>
        <p>Price: ${price}</p>
        <p>Manufacturer: {seller}</p>
        <p>Ratings: {ratings}.00</p>
      </div>
      <button onClick={() => handleProduct(props.product)} className="btn-cart">
        Add to cart
        <FontAwesomeIcon icon={faShoppingCart} />
      </button>
    </div>
  );
};

export default Product;
