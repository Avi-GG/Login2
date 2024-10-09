const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

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
