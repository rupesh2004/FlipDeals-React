const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const { User } = require('./schemas'); // Ensure the User schema is defined
const Stripe = require('stripe');
const nodemailer = require('nodemailer');

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '/uploads'))); // Serve static files from the uploads folder

const stripe = Stripe('sk_test_51QHJ9gJ3vYbqgfoFVDr5ReU8fVjTL5QBaEJnYtCXCLiEzFVr9VMLTcz4CdFnqOGDoKLSDdUtSXXXqO0f3PhlHxTu005tOhGur0'); // Use your actual secret key

app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount < 50) {
      throw new Error("Amount must be at least ₹50");
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert INR to paise
      currency: 'inr',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating Payment Intent:", error.message);
    res.status(500).send({ error: error.message });
  }
});

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

const orderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true },
  quantity: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  deliveryDate: { type: String, required: true },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
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
    
    const productImage = req.file ? req.file.filename : null;

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

    const modifiedProducts = products.map((product) => ({
      _id: product._id,
      productName: product.productName,
      productPrice: product.productPrice,
      companyName: product.companyName,
      productImage: product.productImage
        ? `http://localhost:5000/uploads/${product.productImage}`
        : null,
      productDescription: product.productDescription,
      productSpecification: product.productSpecification,
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
      companyName: product.companyName,
      productImage: product.productImage
        ? `http://localhost:5000/uploads/${product.productImage}`
        : null,
      productDescription: product.productDescription,
      productSpecification: product.productSpecification,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product details' });
  }
});

// User signup route
app.post('/signup', async (req, res) => {
  const { name, mobile, email, password } = req.body;

  if (!name || !mobile || !email || !password) {
    return res.status(400).json({ error: 'Please fill all fields' });
  }

  try {
    const insertUser = new User({
      userName: name,
      userMobile: mobile,
      userEmail: email,
      userPassword: password,
    });

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

  if (!email || !newPassword) {
    return res.status(400).json({ message: 'Email and new password are required' });
  }

  try {
    const result = await User.updateOne(
      { userEmail: email },
      { userPassword: newPassword }
    );

    if (result.nModified === 0) {
      return res.status(404).json({ message: 'User not found or password not updated' });
    }

    res.status(200).json({ message: 'Password successfully updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'flipdeals38@gmail.com', // Your email address
    pass: 'hdtokgaifbfjaugw',   // Your email password
  },
});

// Helper function to send email
const sendOrderConfirmationEmail = async (userEmail, userName, orderData) => {
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4); // Delivery date is 4 days after order

  const mailOptions = {
    from: 'flipdeals38@gmail.com',
    to: userEmail,
    subject: 'Order Confirmation - E-Commerce Store',
    text: `
      Dear ${userName},

      Thank you for placing your order with us. Here are your order details:

      Product: ${orderData.productName}
      Quantity: ${orderData.quantity}
      Total Amount: ₹${orderData.totalAmount}

      Shipping Address:
      ${orderData.address}

      Payment Method: ${orderData.paymentMethod}

      Your order will be delivered by ${deliveryDate.toDateString()}.

      If you have any questions, please feel free to contact us.

      Best regards,
      E-Commerce Store Team
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent successfully.');
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
  }
};

const calculateDeliveryDate = () => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 4);  // Adds 4 days to the current date
  return currentDate.toISOString().split('T')[0];  // Returns in YYYY-MM-DD format
};


app.post('/api/orders', async (req, res) => {
  const { productId, customerName, customerEmail, contactNumber, address, quantity, paymentMethod, totalAmount } = req.body;

  try {
    // Check if the user has already ordered the same product
    const existingOrder = await Order.findOne({
      productId,
      customerEmail,
    });

    if (existingOrder) {
      return res.status(400).json('You have already ordered this product.');
    }

    // Fetch the product name from the Product model using productId
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Create the new order
    const newOrder = new Order({
      productId,
      customerName,
      customerEmail,
      contactNumber,
      address,
      quantity,
      paymentMethod,
      totalAmount,
      deliveryDate: calculateDeliveryDate(),
    });

    await newOrder.save();

    // After saving the order, send confirmation email to the user
    sendOrderConfirmationEmail(customerEmail, customerName, {
      productName: product.productName,  // Use the product's actual name
      quantity,
      totalAmount,
      address,
      paymentMethod,
    });

    return res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    return res.status(500).json({ error: 'Failed to place order' });
  }
});


app.post('/api/checkUser', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ userEmail: email });
    if (user) {
      return res.status(200).json({ exists: true });
    }
    return res.status(404).json({ exists: false });
  } catch (error) {
    console.error('Error checking user:', error);
    return res.status(500).json({ error: 'Failed to check user' });
  }
});

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

const otpStore = {};

app.post('/api/checkEmailAndFetchOrders', async (req, res) => {
  const { email } = req.body;

  if (!email) {
      return res.status(400).json({ message: 'Email is required' });
  }

  try {
      const orders = await Order.find({ customerEmail: email }).populate('productId');

      if (orders.length > 0) {
          const otp = generateOTP();
          otpStore[email] = otp;
          console.log(`Generated OTP: ${otp} for email: ${email}`); // Debugging line

          await transporter.sendMail({
              from: 'your-email@gmail.com',
              to: email,
              subject: 'Your OTP for Order Verification',
              text: `Your OTP is: ${otp}`,
          });

          console.log(`OTP sent to ${email}`); // Debugging line

          return res.status(200).json({ emailFound: true, orders });
      } else {
          return res.status(404).json({ emailFound: false, message: 'No orders found for this email.' });
      }
  } catch (error) {
      console.error('Error sending OTP:', error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

app.post('/api/verifyOtp', (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] && otpStore[email] === otp) {
      // OTP is correct, delete it from store and respond with success
      delete otpStore[email];
      return res.status(200).json({ valid: true });
  } else {
      // OTP is incorrect
      return res.status(400).json({ valid: false, message: 'Incorrect OTP. Please try again.' });
  }
});


// Assuming you're using Express and Mongoose

app.post('/api/orders/cancel', async (req, res) => {
  const { orderId, reason } = req.body;

  try {
      // Find and delete the order with the given ID
      const order = await Order.findById(orderId);

      if (!order) {
          return res.status(404).json({ success: false, message: 'Order not found' });
      }

      // Optionally, log the cancellation reason or store it in another collection for tracking

      // Delete the order from the database
      await Order.findByIdAndDelete(orderId);

      res.json({ success: true, message: 'Order cancelled successfully' });
  } catch (error) {
      console.error('Error cancelling order:', error);
      res.status(500).json({ success: false, message: 'Server error' });
  }
});


app.post('/send-email', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Set up the email options
  const mailOptions = {
      from: email,               // Sender's email
      to: 'flipdeals38@gmail.com', // Receiver's email (FlipDeals)
      subject: subject,
      text: `You have received a new message from: \n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return res.status(500).json({ message: 'Failed to send email.' });
      }
      res.status(200).json({ message: 'Email sent successfully!' });
  });
});



// Start the Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
