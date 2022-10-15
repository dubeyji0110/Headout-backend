const User = require("../../models/user");

module.exports = {
	async getUserLocation(req, res, next) {
		try {
			const userId = req.userId;
			const user = await User.findById(userId);
			return res.status(200).json({
				success: true,
				data: {
					latitude: user.latitude,
					longitude: user.longitude,
				},
			});
		} catch (error) {
			console.error(error);
			return res.status(500).send("Internal Server Error");
		}
	},
	async getUserData(req, res, next) {
		try {
			const userId = req.userId;
			const user = await User.findById(userId);
			return res.status(200).json({
				success: true,
				data: user,
			});
		} catch (error) {
			console.error(error);
			return res.status(500).send("Internal Server Error");
		}
	},
	async updateUser(req, res, next) {
		try {
			const userId = req.userId;
			const user = await User.findById(userId);
			for (key in req.body) {
				user[key] = req.body[key];
			}
			await user.save();
			return res.status(200).json({
				success: true,
				user,
			});
		} catch (error) {
			console.error(error);
			return res.status(500).send("Internal Server Error");
		}
	},
};
