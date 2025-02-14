import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import HomeDelivery from './HomeDelivery';
import './App.css';
import Footer from './footer.js';
import Header from './header.js';
import HomePage from './homedatas';

const App = () => {
  const [product, setProduct] = useState('');
  const [location, setLocation] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [findPressed, setFindPressed] = useState(false); // State to track if Find button is pressed
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFindPressed(true); // Set this to true when the button is pressed

    try {
      const productTrimmed = product.trim();
      const locationTrimmed = location.trim();
      const response = await fetch(`http://localhost:3000/?title=${encodeURIComponent(productTrimmed)}&location=${encodeURIComponent(locationTrimmed)}`);
      const data = await response.json();

      if (response.ok) {
        setProducts(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('An error occurred while fetching products.');
    } finally {
      setIsLoading(false);
    }
  };

  // Navigate to the Home Delivery page with product details
  const handleHomeDelivery = (item) => {
    navigate('/home-delivery', { state: { title: item.title, location: item.location, shop: item.shop, price: item.price } });
  };

  return (
    <div>
       <Header />
      <div className="input-container">
        <h1>Findzy</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="product">Enter Product:</label>
            <input
              type="text"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="location">Enter Your Location:</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Finding...' : 'Find'}
          </button>
        </form>
        
        {/* Conditionally render HomePage or product list based on findPressed state */}
        {!findPressed ? (
          <HomePage />
        ) : (
          products.length > 0 && (
            <div className="product-list">
              <h2>Products Found:</h2>
              <ul>
                {products.map((item) => {
                  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.Address)}`;
                  return (
                    <li key={item._id}>
                      <h3>{item.title}</h3>
                      <h3>{item.location}</h3>
                      <h3>{item.shop}</h3>
                      <img src={item.filename} alt={item.title} style={{ width: '200px', height: '200px' }} />
                      <p>
                        <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                          {item.Address}
                        </a>
                      </p>
                      <p>{item.description}</p>
                      <p>Price: ${item.price}</p>
                      <p>Rating: {item.rating} stars</p>
                      
                      {/* Home Delivery button for each product */}
                      <button 
                        onClick={() => handleHomeDelivery(item)} // Pass the specific product item
                        className="home-delivery-btn"
                      >
                        Place Order
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )
        )}
      </div>
      <Footer />
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home-delivery" element={<HomeDelivery />} />
    </Routes>
  </Router>
);

export default AppWrapper;
