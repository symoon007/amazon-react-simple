import React from 'react';
import './Product.css';

const Product = (props) => {
    const {name, price, ratings, seller, img, quantity} = props.product;
    return (
        <div className="product">
           <img src={img} alt="" />
           <div className="p-info">

           <h6 className="p-name">{name}</h6>
           <p>Price: ${price}</p>
           <p>Manufacturer: {seller}</p>
           <p>Ratings: {ratings}.00</p>
           </div>
           <button className="btn-cart">Add to cart</button>
        </div>
    );
};

export default Product;