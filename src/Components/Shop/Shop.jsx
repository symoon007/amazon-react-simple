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
        console.log(products)
        const storedCart = getShoppingCart();
        const savedCart = [];
        // step 1: get the id
        for(const id in storedCart){
            // console.log(id)
            // step 2: get the product by its id
            const addedProduct = products.find(p => p.id === id)
            if (addedProduct){
                //add quantity
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                // added product to the savedcart
                savedCart.push(addedProduct)
            }
           
           
        }
        // set the cart in UI
        setCart(savedCart)
    }, [products])
    const handleProduct = (product) => {
    //  const newCart = [...cart, product] 
    let newCart = [];
    const exists = cart.find(p => p.id === product.id);
    if (!exists) {
        product.quantity = 1;
        newCart = [...cart, product]
    }
    else {
        exists.quantity += 1;
        const remaining = cart.filter(p => p.id !== product.id);
        newCart = [...remaining, exists]
    }
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