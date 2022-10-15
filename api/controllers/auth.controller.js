const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");

module.exports = {
	async login(req, res, next) {
		try {
			const { email, password } = req.body;

			const user = await User.findOne({
				email: email.toLowerCase(),
			}).select("+password");
			if (!user) return res.status(401).send("Invalid credentials");

			if (!(await bcrypt.compare(password, user.password)))
				return res.status(401).send("Invalid credentials");

			const loggedUser = await User.findById(user._id);

			jwt.sign(
				{
					type: loggedUser.role || "user",
					userId: loggedUser._id,
				},
				process.env.SECRET,
				{ expiresIn: "7d" },
				(err, token) => {
					if (err) throw err;
					return res
						.status(200)
						.json({ success: true, user: loggedUser, token });
				}
			);
		} catch (error) {
			console.error(error);
			return res.status(500).send("Internal Server Error");
		}
	},
	async register(req, res, next) {
		try {
			const { name, email, password, role } = req.body;

			const user = await User.findOne({ email: email.toLowerCase() });
			if (user) return res.status(401).send("Email already registered");

			const saveUser = {
				name,
				email: email.toLowerCase(),
				password: await bcrypt.hash(password, 10),
			};
			if (role) saveUser.role = role;

			const newUser = await new User(saveUser).save();

			jwt.sign(
				{
					type: role || "user",
					userId: newUser._id,
				},
				process.env.SECRET,
				{ expiresIn: "7d" },
				(err, token) => {
					if (err) throw err;
					return res
						.status(201)
						.json({ success: true, user: newUser, token });
				}
			);
		} catch (error) {
			console.error(error);
			return res.status(500).send("Internal Server Error");
		}
	},
};
