const config = {
	port: process.env.PORT || 4000,
	jwtSecret: process.env.JWT_SECRET || 'mkT23j#u!45',
	mongoURI: process.env.MONGODB_URI || 'mongodb+srv://abhi:as70rv65@cluster0-efqto.mongodb.net/test?retryWrites=true'
};

export default config;