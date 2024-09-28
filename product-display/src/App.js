import React, { useState, useEffect } from "react";
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from API
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(data => setProducts(data.products))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="App">
      <h1>Product List</h1>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td><img src={product.thumbnail} alt={product.title} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
