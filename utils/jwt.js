const jwt = require("jsonwebtoken");

module.exports.verifyUser = (req, res, next) => {
	try {
		const token = req.headers.authorization;
		if (!token) return res.status(401).send("Unauthorized user");

		const { userId, role } = jwt.verify(token, process.env.SECRET);
		req.userId = userId;
		req.role = role;
		next();
	} catch (error) {
		console.error(error);
		next(error);
	}
};
