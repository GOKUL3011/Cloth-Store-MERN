import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import EditProduct from './components/EditProduct';
import UpdateProduct from './components/UpdateProduct';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-brand">Genz Store</div>
          <ul className="nav-links">
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/add">Add Product</Link>
            </li>
          </ul>
        </nav>

        <main className="container">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<EditProduct />} />
            <Route path="/edit/:id" element={<UpdateProduct />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
