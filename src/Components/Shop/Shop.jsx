import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';

const Shop = () => {
    const [products, setProduct] = useState([])
    const [cart, setCart] = useState([])
    useEffect(() => {
        fetch('products.json').then( res => res.json()).then(data => setProduct(data))
    }, [])
    useEffect(() =>{
        const storedCart = getShoppingCart();
        console.log(storedCart)
    }, [])
    const handleProduct = (product) => {
     const newCart = [...cart, product] 
     setCart(newCart)
     addToDb (product.id)
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
          <Cart cart={cart}></Cart>
        </div>
      </div>
    );
};

export default Shop;