import React, { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '../productApi';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleUpdate = (product) => {
        navigate(`/edit/${product._id}`, { state: { product } });
    };

    return (
        <div className="product-list">
            <h2>Our Products</h2>
            <div className="products-grid">
                {products.map((product) => (
                    <div key={product._id} className="product-card">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <p>Size: {product.size}</p>
                        <p>Category: {product.category}</p>
                        <div className="button-group">
                            <button 
                                onClick={() => handleUpdate(product)}
                                className="update-btn"
                            >
                                Update
                            </button>
                            <button 
                                onClick={() => handleDelete(product._id)}
                                className="delete-btn"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
