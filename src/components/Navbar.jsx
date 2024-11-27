import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo1.png';

function Navbar() {
    return (
        <AppBar position="static" color="default">
            <Toolbar>
                {/* Left section: Logo, Job Search title, and primary navigation links */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    {/* Logo image */}
                    <img src={logo} alt="Job Search" className="navbar-logo" />

                    {/* Title */}
                    <Typography variant="h6" component="div" className="navbar-title">
                        <span className="job-search">Job Search</span>
                    </Typography>

                    {/* Primary navigation links */}
                    <Box sx={{ display: 'flex', gap: 2, marginLeft: 3 }}>
                        <Button component={Link} to="/" color="inherit">Home</Button>
                        <Button component={Link} to="/jobs" color="inherit">Jobs</Button>
                        <Button component={Link} to="/products" color="inherit">Products</Button>
                        <Button component={Link} to="/hiring-advice" color="inherit">Hiring Advice</Button>
                        <Button component={Link} to="/market-insights" color="inherit">Market Insights</Button>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
    {/* Login Button */}
    <Button 
        component={Link} 
        to="/login" 
        className="login-button"
    >
        Log In
    </Button>
    
    {/* Sign Up Button */}
    <Button 
        component={Link} 
        to="/register" 
        className="signup-button"
    >
        Sign Up
    </Button>
</Box>

            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
