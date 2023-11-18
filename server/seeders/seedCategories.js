// seedData.js
const connectDb = require("../config/connectDb");
const Category = require("../models/Category");

// Define your categories or data to seed
const categoriesToSeed = [
    { name: "chinwas" },
    { name: "italyan" },

];

// Seed function
const seedData = async() => {
    try {
        const db = await connectDb(); // Connect to the database
        await Category.deleteMany({}); // Remove existing categories

        // Seed categories
        const seededCategories = await Category.insertMany(categoriesToSeed);
        console.log("Categories seeded:", seededCategories);

        db.disconnect(); // Close the database connection
    } catch (err) {
        console.error("Error seeding data:", err);
    }
};

seedData(); // Execute the seeding function