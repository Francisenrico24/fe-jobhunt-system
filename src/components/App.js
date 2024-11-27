import React, { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Login from './Login';
import UserList from './UserList';
import PrivateRoute from './PrivateRoute';
import Register from './Register';
import Navbar from './Navbar';
import JobSearch from './JobSearch';

const theme = createTheme({
    palette: {
        background: {
            paper: '#fff',
        },
    },
});

function App() {
    useEffect(() => {
        // Set CSRF token before any other requests
        axios.get('http://localhost:8000/sanctum/csrf-cookie')
            .then(response => {
                console.log('CSRF cookie set:', response);
            })
            .catch(error => {
                console.error('Error setting CSRF cookie:', error);
            });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Navigate to="/job-search" replace />} />
                    <Route path="/job-search" element={<JobSearch />} />
                    <Route path="/login" element={<Login />} />       
                    <Route path="/register" element={<Register />} />
                    <Route 
                        path="/users" 
                        element={
                            <PrivateRoute>
                                <UserList />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
