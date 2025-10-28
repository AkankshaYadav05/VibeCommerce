import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

// Load .env first (before using process.env)
dotenv.config();

const products = [
  {
    name: "Wireless Headphones",
    price: 79.99,
    description: "Premium noise-canceling wireless headphones with 30-hour battery life",
    image_url: "https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg",
  },
  {
    name: "Smart Watch",
    price: 199.99,
    description: "Fitness tracking smartwatch with heart rate monitor and GPS",
    image_url: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg",
  },
  {
    name: "Laptop Stand",
    price: 49.99,
    description: "Ergonomic aluminum laptop stand with adjustable height",
    image_url: "https://images.pexels.com/photos/7974/pexels-photo.jpg",
  },
  {
    name: "USB-C Hub",
    price: 39.99,
    description: "Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader",
    image_url: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg",
  },
  {
    name: "Mechanical Keyboard",
    price: 129.99,
    description: "RGB mechanical gaming keyboard with blue switches",
    image_url: "https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg",
  },
  {
    name: "Wireless Mouse",
    price: 59.99,
    description: "Ergonomic wireless mouse with precision tracking",
    image_url: "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg",
  },
  {
    name: "Webcam 4K",
    price: 89.99,
    description: "Ultra HD 4K webcam with auto-focus and noise reduction",
    image_url: "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg",
  },
  {
    name: "Phone Stand",
    price: 24.99,
    description: "Adjustable phone stand compatible with all smartphones",
    image_url: "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg",
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    await Product.deleteMany({});
    console.log("🗑️ Cleared existing products");

    await Product.insertMany(products);
    console.log("🌱 Seeded products successfully");

    await mongoose.connection.close();
    console.log("🔒 Database connection closed");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
