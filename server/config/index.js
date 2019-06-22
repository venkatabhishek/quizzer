const config = {
	port: process.env.PORT || 3000,
	jwtSecret: process.env.JWT_SECRET || 'mkT23j#u!45',
	mongoURI: process.env.MONGODB_URI || '****'
};

export default config;