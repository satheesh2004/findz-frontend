import React, { useState, useEffect } from 'react';
import "./homedata.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/homeproducts')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="product-grid">
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(product.Address)}`}
               target="_blank"
               rel="noopener noreferrer">
              {product.Address}
            </a>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Rating:</strong> {product.rating} / 5</p>
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default HomePage;
