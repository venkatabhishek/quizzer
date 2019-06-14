import mongoose from 'mongoose';
import config from './index';

mongoose.set('useFindAndModify', false);

const URI = config.mongoURI;
mongoose.connect(URI, { useNewUrlParser: true, useCreateIndex: true  });

// When successfully connected
mongoose.connection.on('connected', () => {
	console.log('Established Mongoose Default Connection');
});

// When connection throws an error
mongoose.connection.on('error', err => {
	console.log('Mongoose Default Connection Error : ' + err);
});