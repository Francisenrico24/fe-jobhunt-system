import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from './services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/login', { email, password });
            if (response.data.token) {
                localStorage.setItem('auth_token', response.data.token);
                navigate('/users'); // Redirect to users page after login
            }
        } catch (error) {
            setError('Invalid login credentials');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Login
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Password"
                    fullWidth
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                />
                <Button variant="contained" color="primary" type="submit">
                    Login
                </Button>
                
                {/* Create Account Button */}
                <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate('/login')} // Redirect to register page
                    style={{ marginTop: 16 }}
                >
                    Create Account
                </Button>

                {error && <Typography color="error">{error}</Typography>}
            </form>
        </Container>
    );
};

export default Login;
