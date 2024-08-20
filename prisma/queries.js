// Use these queries in your controllers to pass the necessary data to the views
// You will need to pass a username for the greeting (hello, user)
// You will need to get the books array of that users books to display them

const prisma = require("./prismaClient");

// get a user by username for authentication via passport-config.js
async function getUserByUsername(user) {

    return await prisma.users.findUnique({ where: { username: user } });

}

async function getUserByID(id) {
    return await prisma.users.findUnique({ where: { id } });
}



// add a user
async function addUser(user, hash) {
    try {
        const existingUser = await prisma.users.findUnique({
            where: { username: user }
        });

        if (existingUser) {
            throw new Error('Username already taken');
        }

        await prisma.users.create({
            data: {
                username: user,
                password: hash
            }
        });
    } catch (error) {
        // Re-throw the error for the controller to handle
        throw error;
    }
}


module.exports = {
    addUser,
    getUserByUsername,
    getUserByID
}