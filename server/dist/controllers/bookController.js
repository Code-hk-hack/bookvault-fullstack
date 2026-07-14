"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBook = exports.getBooks = void 0;
const prisma_1 = require("../prisma");
// Get all books
const getBooks = async (req, res) => {
    try {
        const books = await prisma_1.prisma.book.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json(books);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch books' });
    }
};
exports.getBooks = getBooks;
// Create a new book
const createBook = async (req, res) => {
    try {
        const { title, author, genre, coverImage, rating, lore } = req.body;
        const newBook = await prisma_1.prisma.book.create({
            data: { title, author, genre, coverImage, rating, lore },
        });
        res.status(201).json(newBook);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create book' });
    }
};
exports.createBook = createBook;
