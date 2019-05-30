import express from 'express';
import cookieParser from 'cookie-parser';
import config from './server/config';
import userRoutes from './server/routes/user';
import authRoutes from './server/routes/auth';
import activityRoutes from './server/routes/activity';

// DB connection
require('./server/config/dbConnection');

const app = express();

// middleware functions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', activityRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		res.status(401).json({ error: err.name + ':' + err.message });
	}
});

app.listen(config.port, () => {
	console.log(`Listening at port ${config.port}`);
});