const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
	type: "string",
	base: joi.string(),
	messages: {
		"string.escapeHTML": "{{#label}} must not include HTML!",
	},
	rules: {
		escapeHTML: {
			validate(value, helpers) {
				const clean = sanitizeHtml(value, {
					allowedTags: [],
					allowedAttributes: {},
				});
				if (clean !== value)
					return helpers.error("string.escapeHTML", { value });
				return clean;
			},
		},
	},
});

const Joi = BaseJoi.extend(extension);

module.exports.schemas = {
	userRegisterSchema: Joi.object({
		name: Joi.string().required().escapeHTML(),
		email: Joi.string().required().email(),
		password: Joi.string()
			.required()
			.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
		role: Joi.string().optional().valid("user", "admin", "root"),
		latitude: Joi.string().required(),
		longitude: Joi.string().required(),
		profilePicUrl: Joi.string().optional(),
		cloudinaryId: Joi.string().optional(),
	}),
	userLoginSchema: Joi.object({
		email: Joi.string().optional().email(),
		password: Joi.string().required(),
	}),
	productCreateSchema: Joi.object({
		name: Joi.string().required().escapeHTML(),
		description: Joi.string().optional().escapeHTML(),
		image: Joi.string().optional().escapeHTML(),
		userId: Joi.string().length(24).required(),
	}),
	productDeleteSchema: Joi.object({
		userId: Joi.string().length(24).required(),
	}),
	productUpdateSchema: Joi.object({
		name: Joi.string().optional().escapeHTML(),
		description: Joi.string().optional().escapeHTML(),
		image: Joi.string().optional().escapeHTML(),
		userId: Joi.string().length(24).required(),
		productId: Joi.string().length(24).required(),
	}),
	userUpdateSchema: Joi.object({
		name: Joi.string().required().escapeHTML(),
		email: Joi.string().required().email(),
		role: Joi.string().optional().valid("user", "admin", "root"),
		latitude: Joi.string().required(),
		longitude: Joi.string().required(),
		profilePicUrl: Joi.string().optional(),
		cloudinaryId: Joi.string().optional(),
	}),
};

module.exports.validateBody = (schema) => {
	return (req, res, next) => {
		try {
			console.log("Body:", req.body);
			console.log("Query:", req.query);

			const result =
				req.method != "GET"
					? schema.validate(req.body)
					: schema.validate(req.query);

			if (result.error) {
				var errors = [];
				if (result.error.isJoi) {
					for (let i = 0; i < result.error.details.length; i++) {
						errors.push(result.error.details[i].message);
					}
				}
				console.log("Error from validation JOI:", errors);
				return res.status(500).json({ success: false, errors: errors });
			}
			if (!req.value) {
				req.value = {};
			}
			req.value["body"] = result.value;
			next();
		} catch (err) {
			next(err);
		}
	};
};
