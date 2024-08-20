
async function newUserSignup(req, res) {
   // some validation stuff
    res.render('signup');
}

// async function userDashboard(req, res) {
//     // some validation stuff
//      res.render('dashboard', { USER DATA });
//  }
 
module.exports = { newUserSignup };
