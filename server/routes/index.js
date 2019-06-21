const router = require('express').Router();
const path = require('path');

import userRoutes from './/user';
import authRoutes from './auth';
import activityRoutes from './activity';

router.use('/', userRoutes);
router.use('/', authRoutes);
router.use('/', activityRoutes);

router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;