const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const { User } = require('./schemas'); // Ensure the User schema is defined

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

// Define Product Schema with new fields
const productSchema = new mongoose.Schema({
  productName: String,
  productPrice: String,
  companyName: String, // Added company name
  productImage: String, // Path to the image file
  productDescription: String, // Description of the product
  productSpecification: String, // New field for specifications
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
    const {
      productName,
      productPrice,
      companyName,
      productDescription,
      productSpecification,
    } = req.body;
    
    const productImage = req.file ? req.file.filename : null; // Get the filename of the uploaded image

    const newProduct = new Product({
      productName,
      productPrice,
      companyName,
      productImage,
      productDescription,
      productSpecification,
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
      companyName: product.companyName, // Include company name
      productImage: product.productImage
        ? `http://localhost:5000/uploads/${product.productImage}`
        : null,
      productDescription: product.productDescription,
      productSpecification: product.productSpecification, // Include specifications
    }));

    res.json(modifiedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Single Product by ID Route
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({
      _id: product._id,
      productName: product.productName,
      productPrice: product.productPrice,
      companyName: product.companyName, // Include company name
      productImage: product.productImage
        ? `http://localhost:5000/uploads/${product.productImage}`
        : null,
      productDescription: product.productDescription,
      productSpecification: product.productSpecification, // Include specifications
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product details' });
  }
});

// User signup route
app.post('/signup', async (req, res) => {
  const { name, mobile, email, password } = req.body;

  // Validate the request
  if (!name || !mobile || !email || !password) {
    return res.status(400).json({ error: 'Please fill all fields' });
  }

  try {
    // Create new user
    const insertUser = new User({
      userName: name,
      userMobile: mobile,
      userEmail: email,
      userPassword: password,
    });

    // Save to MongoDB
    await insertUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error('Error registering user:', error);
  }
});

// User signin route
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ userEmail: email, userPassword: password });
    if (user) {
      res.status(200).json({ success: true, user });
    } else {
      res.status(401).json({ success: false, error: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Reset password route
app.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  // Validate the request
  if (!email || !newPassword) {
    return res.status(400).json({ message: 'Email and new password are required' });
  }

  try {
    // Find the user by email and update the password directly
    const result = await User.updateOne(
      { userEmail: email },
      { userPassword: newPassword } // Update the password
    );

    if (result.nModified === 0) {
      return res.status(404).json({ message: 'User not found or password not updated' });
    }

    res.status(200).json({ message: 'Password successfully updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
