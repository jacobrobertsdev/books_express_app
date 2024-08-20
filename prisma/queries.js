// Use these queries in your controllers to pass the necessary data to the views
// You will need to pass a username for the greeting (hello, user)
// You will need to get the books array of that users books to display them

const prisma = require("./prismaClient");

// get a user by id

// get all books belonging to a user
// this will be an array you will loop over to render book cards
// i.e. for(book of books){
// create list item, use book.title, book.author, etc

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
    addUser
}