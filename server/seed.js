const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // ✅ Create multiple users
    const users = await User.insertMany([
      {
        name: 'Admin User',
        email: 'admin@bigDaddy.com',
        password: hashedPassword,
        role: 'admin'
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: hashedPassword,
        role: 'user'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: hashedPassword,
        role: 'user'
      },
      {
        name: 'Alex Johnson',
        email: 'alex@example.com',
        password: hashedPassword,
        role: 'user'
      }
    ]);

    const adminUser = users[0]._id; // optional if you want to link products

    // ✅ Products
    const products = [
  {
    name: 'Dragon Tattoo Design',
    description: 'Detailed black ink dragon tattoo design.',
    price: 500,
    size: 8,
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1595433562696-0c6b91f3a1c5',
    rating: 4.7,
    numReviews: 18
  },
  {
    name: 'Skull Tattoo Artwork',
    description: 'Bold skull tattoo with dark shading.',
    price: 650,
    size: 10,
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6',
    rating: 4.5,
    numReviews: 22
  },
  {
    name: 'Minimalist Line Tattoo',
    description: 'Simple and clean minimalist tattoo design.',
    price: 300,
    size: 6,
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1589987607627-616fdfbe7c7f',
    rating: 4.3,
    numReviews: 10
  },
  {
    name: 'Full Sleeve Tribal Tattoo',
    description: 'Complex tribal full sleeve tattoo design.',
    price: 1200,
    size: 18,
    stock: 5,
    imageUrl: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a',
    rating: 4.9,
    numReviews: 40
  }
];

    await Product.insertMany(products);

    console.log('✅ Data Imported Successfully!');
    console.log('👤 Users Created:', users.length);

    process.exit();
  } catch (error) {
    console.error(`❌ Error with data import: ${error.message}`);
    process.exit(1);
  }
};
importData();