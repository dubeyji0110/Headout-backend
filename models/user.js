const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
		latitude: {
			type: String,
		},
		longitude: {
			type: String,
		},
		profilePicUrl: {
			type: String,
			default:
				"https://res.cloudinary.com/dgcqwvlkj/image/upload/v1665868055/pfp/st_small_507x507-pad_600x600_f8f8f8_jpobdu.jpg",
		},
		cloudinaryId: {
			type: String,
		},
		role: {
			type: String,
			default: "user",
			enum: ["user", "admin", "root"],
		},
		resetToken: {
			type: String,
		},
		expireToken: {
			type: Date,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model(mongoose.models.User || "User", UserSchema);
