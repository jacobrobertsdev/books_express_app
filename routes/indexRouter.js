const { Router } = require('express');
const indexRouter = Router();
const controller = require('../controllers/indexController');

indexRouter.get('/', controller.getIndex);

module.exports = indexRouter;