import React from 'react';
import './ReviewItem.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";



const ReviewItem = ({product, handleRemoveCart}) => {
    const {name, img, price,id, quantity} = product;
    return (
      <div className="review-item">
        <img src={img} alt="" />
        <div className="review-details">
          <p className="product-title">{name}</p>
          <p>
            Price: <span className="orange-text">${price}</span>
          </p>
          <p>
            Quantity: <span className="orange-text">{quantity}</span>
          </p>
        </div>
        <button className="btn-delete" onClick={()=> handleRemoveCart(id)}>
          <FontAwesomeIcon className="delete-icon" icon={faTrashCan} />
        </button>
      </div>
    );
};

export default ReviewItem;