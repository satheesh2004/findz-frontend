import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './HomeDelivery.css';

const HomeDelivery = () => {
  const location = useLocation();
  const { title, location: itemLocation, shop, price } = location.state || {}; // Retrieve product details
  
  // State for quantity, address, payment method, and total price
  const [quantity, setQuantity] = useState(1);  // Initialize with 1 as default quantity
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');

  // Calculate total price based on quantity
  const totalPrice = quantity * price;

  // Increment quantity
  const increment = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  // Decrement quantity, ensuring it doesn't go below 1
  const decrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Collect the necessary data
    const data = {
      title,
      location: itemLocation,
      shop,
      price,
      quantity,
      totalPrice,
      address,
      paymentMethod
    };

    try {
      const response = await fetch('http://localhost:3000/submitHomeDelivery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Order submitted successfully');
      } else {
        alert('your order is alredy submitted');
      }
    } catch (error) {
      alert('Error submitting the order');
    }
  };

  return (
    <div className="home-delivery-container">
      <h1>Home Delivery</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="address">Enter Your Address:</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Choose Payment Method:</label>
          <div>
            <input
              type="radio"
              id="cash"
              name="paymentMethod" 
              value="cash"
              checked={paymentMethod === 'cash'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="cash">Cash on Delivery</label>
          </div>

          <div>
            <input
              type="radio"
              id="netbanking"
              name="paymentMethod"
              value="netbanking"
              checked={paymentMethod === 'netbanking'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="netbanking">Netbanking</label>
          </div>
        </div>

        <div className="product-details">
          <h3>Product Details:</h3>
          <p>Title: {title}</p>
          <p>Location: {itemLocation}</p>
          <p>Shop: {shop}</p>
          <p>Price per unit: ${price}</p>
          
          {/* Quantity Controls */}
          <div className="quantity-controls">
            <button type="button" onClick={decrement} className="quantity-btn">-</button>
            <span className="quantity-display">{quantity}</span>
            <button type="button" onClick={increment} className="quantity-btn">+</button>
          </div>

          {/* Total Price based on Quantity */}
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HomeDelivery;
