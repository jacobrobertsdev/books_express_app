// Use these queries in your controllers to pass the necessary data to the views
// You will need to pass a username for the greeting (hello, user)
// You will need to get the books array of that users books to display them

const prisma = require("./prismaClient");

// get a user by username for authentication via passport-config.js
async function getUserByUsername(username) {
    return await prisma.users.findUnique({ where: { username } });
}

// get user by ID
async function getUserByID(id) {
    return await prisma.users.findUnique({ where: { id } });
}

// add a user
async function addUser(username, hash) {
    try {
        const existingUser = await prisma.users.findUnique({ where: { username } });
        if (existingUser) {
            throw new Error('That username is already taken!');
        }
        await prisma.users.create({
            data: { username, password: hash }
        });
    } catch (error) {
        throw error;
    }
}

// Get a book by ID
async function getBookByID(id) {
    try {
        const book = await prisma.books.findUnique({ where: { id } });
        return book;
    } catch (error) {
        // Handle errors, e.g., log them or rethrow
        console.error("Error retrieving book by ID:", error);
        throw error;
    }
}

async function updateBook(id, updateData) {
    try {
        await prisma.books.update({ where: { id }, data: updateData });

    } catch (error) {
        // Handle errors, e.g., log them or rethrow
        console.error("Error updating book:", error);
        throw error;
    }
}

async function deleteBookByID(id) {
    try {
        await prisma.books.delete({ where: { id } })
    } catch (error) {
        // Handle errors, e.g., log them or rethrow
        console.error("Error deleting book:", error);
        throw error;
    }
}


module.exports = {
    addUser,
    getUserByUsername,
    getUserByID,
    getBookByID,
    updateBook,
    deleteBookByID,
}