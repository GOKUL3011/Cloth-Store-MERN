import React, { useState } from 'react';
import { createProduct } from '../productApi';
import { useNavigate } from 'react-router-dom';

const EditProduct = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        size: '',
        inStock: true
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!product.name || !product.description || !product.price || !product.category || !product.size) {
                setError('Please fill in all required fields');
                return;
            }

            if (isNaN(product.price) || product.price <= 0) {
                setError('Please enter a valid price');
                return;
            }

            console.log('Submitting product:', product);
            const response = await createProduct(product);
            console.log('Product created:', response.data);
            
            alert('Product created successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error creating product:', error);
            setError(error.response?.data?.message || 'Error creating product. Please try again.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) || value : value
        }));
    };

    return (
        <div className="edit-product">
            <h2>Add New Product</h2>
            {error && <div className="error-message" style={{color: 'red', marginBottom: '1rem'}}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <select
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Shirts">Shirts</option>
                        <option value="Pants">Pants</option>
                        <option value="T-Shirts">T-Shirts</option>
                        <option value="Tracks">Tracks</option>
                    </select>
                </div>
                <div>
                    <label>Size:</label>
                    <select
                        name="size"
                        value={product.size}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Size</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                </div>
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default EditProduct;
