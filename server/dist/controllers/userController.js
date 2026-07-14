"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.createUser = void 0;
const prisma_1 = require("../prisma");
const createUser = async (req, res) => {
    try {
        const email = String(req.body.email);
        const username = String(req.body.username);
        const existingUser = await prisma_1.prisma.user.findFirst({
            where: { email },
        });
        if (existingUser)
            return res.status(400).json({ error: 'User exists' });
        const newUser = await prisma_1.prisma.user.create({ data: { email, password: 'hashedpassword' } });
        return res.status(201).json(newUser);
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to create user' });
    }
};
exports.createUser = createUser;
const getUserProfile = async (req, res) => {
    try {
        const id = String(req.params.id);
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: id },
            include: { savedBooks: true },
        });
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        return res.json(user);
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to fetch user profile' });
    }
};
exports.getUserProfile = getUserProfile;
