const express = require('express');
const cors = require('cors');
const connectDB=require('./backend/configs/db')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const productRoutes = require('./backend/routes/product');

dotenv.config();
connectDB()

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
