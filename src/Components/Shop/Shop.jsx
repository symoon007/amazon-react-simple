import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';

const Shop = () => {
    const [products, setProduct] = useState([])
    const [cart, setCart] = useState([])
    useEffect(() => {
        fetch('products.json').then( res => res.json()).then(data => setProduct(data))
    }, [])
    const handleProduct = (product) => {
     const newCart = [...cart, product] 
     setCart(newCart)
    };
    return (
      <div className="shop-container">
        <div className="products-container">
          {products.map((product) => (
            <Product 
            product={product} 
            key={product.id}
            handleProduct = {handleProduct}
            ></Product>
          ))}
        </div>
        <div className="cart-container">
          <h4 style={{textAlign: 'center'}}>Order Summary</h4>
          <h3>Selected Products: {cart.length}</h3>
        </div>
      </div>
    );
};

export default Shop;