const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true, // Enforces unique usernames
	},
	password: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("user", userSchema);
