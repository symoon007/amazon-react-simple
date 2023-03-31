import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';

const Shop = () => {
    const [products, setProduct] = useState([])
    useEffect(() => {
        fetch('products.json').then( res => res.json()).then(data => setProduct(data))
    }, [])
    return (
      <div className="shop-container">
        <div className="products-container">
          {products.map((product) => (
            <Product product={product} key={product.id}></Product>
          ))}
        </div>
        <div className="cart-container">
          <h4>Order Summary</h4>
        </div>
      </div>
    );
};

export default Shop;