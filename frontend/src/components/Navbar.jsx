import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [username, setUsername] = useState("Guest"); // Define the username state
	const [buttonText, setButtonText] = useState("Login");
	const navigate = useNavigate();

	useEffect(() => {
		// Check if token exists in cookies
		const token = Cookies.get("token");
		console.log(token);
		if (token) {
			setIsAuthenticated(true);
			setButtonText("Logout");
			
			
			// Decode the token to get the username
			const decoded = jwtDecode(token);
			console.log(decoded);
			
			setUsername(decoded.username); // Set the username from the token because it will rerender the component to make it visible
		}
	});

	const handleLogout = async () => {
		try {
			const response = await fetch(
				"https://login2-backend.onrender.com/logout",
				{
					method: "POST", // Use POST to send logout request
					credentials: "include", // Include cookies in the request
				}
			);

			if (response.ok) {
				// Handle successful logout (you might want to navigate to the login page or home page)
				console.log("Logged out successfully");
				setIsAuthenticated(false);
				setButtonText("Login");
				setUsername("Guest");
				navigate("/"); // Redirect to the home page or login page
			} else {
				// Handle logout errors
				console.error("Logout failed");
			}
		} catch (error) {
			console.error("Error:", error); // Handle any network errors
		}
	};

	const handleButtonClick = () => {
		if (!isAuthenticated && buttonText === "Login") {
			navigate("/login");
		} else if (isAuthenticated && buttonText === "Logout") {
			handleLogout();
		}
	};

	return (
		<div className="w-full h-20  shadow-lg flex justify-between items-center px-3">
			<p className="font-bold text-teal-500 text-6xl">
				Hello <span className="text-fuchsia-500">{username} !</span>
			</p>
			<button
				className="border-2 h-12 border-orange-500 font-bold bg-white text-orange-500 px-4  hover:bg-orange-500 hover:text-white hover:border-white rounded-[999px]"
				onClick={handleButtonClick}
			>
				{buttonText}
			</button>
		</div>
	);
};

export default Navbar;
