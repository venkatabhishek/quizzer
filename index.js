import express from 'express';
import cookieParser from 'cookie-parser';
import config from './server/config';
import routes from './server/routes';

// DB connection
require('./server/config/dbConnection');

const app = express();

// middleware functions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// react app

app.use(express.static('client/build'));

// routes

app.use(routes);

// Error handling middleware
app.use((err, req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		res.status(401).json({ error: err.name + ':' + err.message });
	}
});

app.listen(config.port, () => {
	console.log(`Listening at port ${config.port}`);
});