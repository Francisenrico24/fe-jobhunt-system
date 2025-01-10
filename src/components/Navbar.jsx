import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo1.png";
import api from "../services/api"; // Make sure this path matches your project structure

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Call logout endpoint
            await api.post("/logout");
            // Remove auth token
            localStorage.removeItem("auth_token");
            // Redirect to login page
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
            // Even if the API call fails, remove token and redirect
            localStorage.removeItem("auth_token");
            navigate("/login");
        }
    };

    return (
        <AppBar position="static" color="default">
            <Toolbar>
                {/* Left section: Logo, Job Search title, and primary navigation links */}
                <Box
                    sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}
                >
                    {/* Logo image */}
                    <img src={logo} alt="Job Search" className="navbar-logo" />

                    {/* Title */}
                    <Typography
                        variant="h6"
                        component="div"
                        className="navbar-title"
                    >
                        <span className="job-search">Job Search</span>
                    </Typography>

                    {/* Primary navigation links */}
                    <Box sx={{ display: "flex", gap: 2, marginLeft: 3 }}>
                        <Button component={Link} to="/" color="inherit">
                            Home
                        </Button>
                        <Button component={Link} to="/jobs" color="inherit">
                            Jobs
                        </Button>
                        <Button component={Link} to="/products" color="inherit">
                            Products
                        </Button>
                        <Button
                            component={Link}
                            to="/hiring-advice"
                            color="inherit"
                        >
                            Hiring Advice
                        </Button>
                        <Button
                            component={Link}
                            to="/market-insights"
                            color="inherit"
                        >
                            Market Insights
                        </Button>
                    </Box>
                </Box>

                {/* Add logout button to the right */}
                <Button
                    onClick={handleLogout}
                    color="inherit"
                    sx={{
                        backgroundColor: "#ff5733",
                        color: "white",
                        "&:hover": {
                            backgroundColor: "#ff5733",
                        },
                        marginLeft: 2,
                    }}
                >
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
