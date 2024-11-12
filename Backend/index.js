import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';




// Initialize Express App
const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

app.use((req, res, next) => {
  res.cookie('cookieName1', 'cookieValue1', {
    sameSite: 'None', // or 'Lax' / 'Strict'
    secure: true,     // Secure attribute must be true if SameSite=None
    httpOnly: true
  });

  res.cookie('cookieName2', 'cookieValue2', {
    sameSite: 'Strict', // or 'Lax'
    secure: true,
    httpOnly: true
  });

  next();
});



// Connect to MongoDB

  mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB successfully!'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));


// Define a schema and model for a collection (Product schema)
const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  quantity: String,
  description: String,
  image: String
});

const Product = mongoose.model('Product', productSchema);

// Define a route to get all products from the 'Product' collection
app.get("/getData", async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the 'Product' collection
    res.json(products); // Send the data as JSON response
    console.log("sssssssssssssssssss");
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

// Define order schema
const orderSchema = new mongoose.Schema({
  customerDetail: {
    name: String,
    contact: String, // Use consistent field names
    city: String,
    address: String
    
  },
  products: [{
    id: String,
    name: String,
    quantity: Number,
    price: Number
  }]
});

const Order = mongoose.model('Order', orderSchema);

// Define a route to handle adding data (POST request)
app.post('/submitOrder', (req, res) => {
  const newOrder = new Order(req.body); // Get the data from the request body
  console.log('Received Order Dataaaaaaaaaaaaaaaaaaaaa:'+ req.body);

  newOrder.save() // Save the data to MongoDB
    .then(order => {
      res.status(201).send({ message: 'Order added successfully', order });
    })
    .catch(error => {
      console.error('Error saving order:', error);
      res.status(500).send({ message: 'Error saving order', error });
    });
});
const PORT =process.env.PORT

// Start the Express server
app.listen(PORT, () => {
  console.log("App is running on port 5000",PORT);
});



// Get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React app's 'dist' folder
app.use(express.static(path.join(__dirname, '../Al-Noor/dist')));

// Catch-all route to serve React's index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Al-Noor/dist', 'index.html'));
});