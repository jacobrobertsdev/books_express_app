const { Router } = require('express');
const indexRouter = Router();
const controller = require('../controllers/indexController');

/* GET requests to /
   * Calls `controller.getIndex`, redirects user to login ("/" is never visited).
*/
indexRouter.get('/', controller.getIndex);

module.exports = indexRouter;
