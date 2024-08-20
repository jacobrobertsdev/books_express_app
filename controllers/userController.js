
async function registerNewUser(req, res) {
   // some validation stuff
    res.render('register');
}

// async function userDashboard(req, res) {
//     // some validation stuff
//      res.render('dashboard', { USER DATA });
//  }
 
module.exports = { registerNewUser };
