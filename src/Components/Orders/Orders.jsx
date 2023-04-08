import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css'
import { removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const savedCart = useLoaderData()
   const [cart, setCart] = useState(savedCart)
   const handleRemoveCart = (id) => {
    const remainingCart = cart.filter( p => p.id !== id);
    setCart(remainingCart)
    removeFromDb (id)
   }
    return (
        <div className="shop-container">
            <div className="review-container">
               {
                cart.map((product) => <ReviewItem key={product.id} product={product} handleRemoveCart = {handleRemoveCart} />)
               }
            </div>
            <div className="cart-container">
                <Cart cart={cart}/>
            </div>
        </div>
    );
};

export default Orders;