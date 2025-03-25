const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://user1:123@cluster0.ec9tf.mongodb.net/book', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a Book schema
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    image: String,
    publishedDate: String,
    synopsis: String,
});

// Create models for each collection
const Book = mongoose.model('Book', bookSchema, 'book_recommendations'); // Home Page
const TrendingBook = mongoose.model('TrendingBook', bookSchema, 'trending-books'); // Trending Page
const BestSellerBook = mongoose.model('BestSellerBook', bookSchema, 'best-sellers'); // Best Sellers Page

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get all books (Home Page)
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find();
        console.log('Books:', books); // Log the data
        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error); // Log the error
        res.status(500).json({ message: error.message });
    }
});

// API endpoint to get trending books (Trending Page)
app.get('/api/trending-books', async (req, res) => {
    try {
        const books = await TrendingBook.find();
        console.log('Trending Books:', books); // Log the data
        res.json(books);
    } catch (error) {
        console.error('Error fetching trending books:', error); // Log the error
        res.status(500).json({ message: error.message });
    }
});

// API endpoint to get best sellers (Best Sellers Page)
app.get('/api/best-sellers', async (req, res) => {
    try {
        const books = await BestSellerBook.find();
        console.log('Best Sellers:', books); // Log the data
        res.json(books);
    } catch (error) {
        console.error('Error fetching best sellers:', error); // Log the error
        res.status(500).json({ message: error.message });
    }
});
// API endpoint to get all books (from all collections)
app.get('/api/all-books', async (req, res) => {
    try {
        const books = await Book.find();
        const trendingBooks = await TrendingBook.find();
        const bestSellerBooks = await BestSellerBook.find();

        // Combine all books into a single array
        const allBooks = [...books, ...trendingBooks, ...bestSellerBooks];
        console.log('All Books:', allBooks); // Log the data
        res.json(allBooks);
    } catch (error) {
        console.error('Error fetching all books:', error); // Log the error
        res.status(500).json({ message: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});