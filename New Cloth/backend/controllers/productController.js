const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        console.log('Products fetched:', products);
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.createProduct = async (req, res) => {
    console.log('Received product data:', req.body);
    
    try {
        const requiredFields = ['name', 'description', 'price', 'category', 'size'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({ 
                message: `Missing required fields: ${missingFields.join(', ')}` 
            });
        }

        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: Number(req.body.price),
            category: req.body.category,
            size: req.body.size,
            inStock: req.body.inStock !== false
        });

        console.log('Created product object:', product);

        const newProduct = await product.save();
        console.log('Saved product:', newProduct);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(400).json({ 
             error: error.message
        });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const {id}= req.params
        const {name,description,price,category,size}=req.body
        const updata=await Product.findByIdAndUpdate(
            id,
            {name,description,price,category,size}
        )
        if(!updata){
            res.status(404).json({ message: 'Product not found' });
        }
        else {
            res.status(200).json(updata)
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const {id}=req.params
        await Product.findByIdAndDelete(id)
        res.json({ message: 'Product removed' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: error.message });
    }
};
