const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS
app.use('/uploads', express.static(path.join(__dirname, '/uploads'))); // Serve static files from the uploads folder

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/e-commerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check the connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define Product Schema
const productSchema = new mongoose.Schema({
  productName: String,
  productPrice: String,
  productImage: String, // Path to the image file
});

// Create Product Model
const Product = mongoose.model('Product', productSchema);

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Files will be saved in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    // Generate a unique filename using the current timestamp
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
// Test Route
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

// Upload Product Route
app.post('/api/products', upload.single('productImage'), async (req, res) => {
  try {
    const { productName, productPrice } = req.body;
    const productImage = req.file ? req.file.filename : null; // Get the filename of the uploaded image

    const newProduct = new Product({
      productName,
      productPrice,
      productImage,
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Products Route
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();

    // Modify the productImage path to include the uploads URL
    const modifiedProducts = products.map((product) => ({
      _id: product._id,
      productName: product.productName,
      productPrice: product.productPrice,
      productImage: product.productImage
        ? `http://localhost:5000/uploads/${product.productImage}`
        : null,
    }));

    res.json(modifiedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
