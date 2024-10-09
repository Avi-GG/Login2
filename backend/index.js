const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("./models/user");
const cookieParser = require("cookie-parser");
// require('dotenv').config();

const app = express();
app.use(
	cors({
		origin: "https://login2-flax.vercel.app", // Use the environment variable
		credentials: true, // Allow credentials (cookies, authorization headers, etc.)
	})
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
	res.sendFile(__dirname + "/dist/index.html");
})

app.post("/Signup", async (req, res) => {
	const { username, password } = req.body;
	const existingUser = await user.findOne({ username });
	if (existingUser) {
		return res.status(400).json({ message: "Username already exists" });
	}
	const hashedPassword = await bcrypt.hash(password, 10);
	const newUser = await user.create({ username, password: hashedPassword });
	console.log(newUser);
	res.status(201).json({ message: "User registered successfully" });
});

app.post("/login", async (req, res) => {
	console.log("Login Request Body:", req.body);
	const { username, password } = req.body;
	const foundUser = await user.findOne({ username });
    console.log("Logged in");
	if (!foundUser) {
		return res.status(400).json({ error: "User not found" });
	}
	const isPasswordValid = await bcrypt.compare(password, foundUser.password);
	if (!isPasswordValid) {
		return res.status(400).json({ error: "Invalid password" });
	}
	const token = jwt.sign({ username: foundUser.username }, "secretKey");

	res.cookie("token", token, {
        path: "/", // Allow access from any path
    	domain: "login2-flax.vercel.app", // Replace with your actual domain 
        secure: true, // Temporarily set to false for testing
        sameSite: "None", // You can set it to Lax for testing
       
    });
    console.log(token);
    

	res.json({ message: "Logged in successfully" });
});

app.post("/logout", async (req, res) => {
	res.clearCookie("token");
	res.json({ message: "Logged out successfully" });
});

app.post("/check-username", async (req, res) => {
	const { username } = req.body;
	const foundUser = await user.findOne({ username });

	if (foundUser) {
		return res.status(400).json({ message: "Username is already taken." });
	}

	return res.status(200).json({ message: "Username is available." });
});

app.listen(5001, () => {
	console.log("Server running on port 5001");
});
