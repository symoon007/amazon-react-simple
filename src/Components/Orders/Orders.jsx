import React from 'react';
import Cart from '../Cart/Cart';

const Orders = () => {
    return (
        <div className="shop-container">
            <div className="products-container">
                <h3>Orders page</h3>
            </div>
            <div className="cart-container">
                <Cart cart={[]}/>
            </div>
        </div>
    );
};

export default Orders;<h5>orders</h5>