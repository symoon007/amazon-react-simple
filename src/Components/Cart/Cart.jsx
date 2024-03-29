import React from 'react';
import ('./Cart.css')
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";



const Cart = ({cart, handleClrCart, children}) => {
    
    let total =0;
    let totalshipping =0;
    let quantity = 0;
    for(const product of cart) {
        // product.quantity = product.quantity || 1;
        total += product.price* product.quantity;
        totalshipping += product.shipping
        quantity += product.quantity;
    }
    const tax = total*7/100;
    const grandTotal = total + tax +totalshipping;
    return (
      <div className="cart">
        <h4 style={{ textAlign: "center" }}>Order Summary</h4>
        <p>Selected Products: {quantity}</p>
        <p>Total Price: ${total.toFixed(2)}</p>
        <p>Total Shipping:{totalshipping.toFixed(2)} </p>
        <p>TAX: {tax.toFixed(2)}</p>
        <h6>Grand Total: {grandTotal.toFixed(2)}</h6>
        <button className="btn-clear" onClick={handleClrCart}> <span>Clear Cart</span>
           <FontAwesomeIcon icon={faTrashCan} /></button>
           {children}
      </div>
    );
};

export default Cart;