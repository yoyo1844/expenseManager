const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(cors())
// MongoDB connection
mongoose.connect('mongodb://localhost:27017/kharchDB')
  .then(() => console.log('Connected to DB'))
  .catch(() => console.log('Failed to connect to DB'));

// Define the schema for expenses (Kharch)
const KharchSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  shopName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Kharch model
const Kharch = mongoose.model('Kharch', KharchSchema);

// POST endpoint to create a new expense (kharch)
app.post('/api/kharch', async (req, res) => {
  const { amount, description, shopName, category } = req.body;

  // Validate the input
  if (!amount || !description || !shopName || !category) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Create a new Kharch object
    const newKharch = new Kharch({
      amount,
      description,
      shopName,
      category,
    });

    // Save the expense (kharch) to MongoDB
    const savedKharch = await newKharch.save();

    // Return the saved kharch as a response
    res.status(201).json(savedKharch);
  } catch (error) {
    console.error('Error saving expense:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET endpoint to retrieve all expenses (kharch)
app.get('/api/kharch', async (req, res) => {
  try {
    // Retrieve all expenses from the database
    const kharchList = await Kharch.find();

    // Return the list of expenses
    res.status(200).json(kharchList);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
