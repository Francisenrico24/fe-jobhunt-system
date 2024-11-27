import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Paper, Box, Grid, Link } from '@mui/material';
import { styled } from '@mui/system';
import api from '../services/api';
import logo from '../assets/logo1.png';
import backgroundImage from '../assets/backgroundpic.jpg'; 

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await api.get('http://localhost:8000/sanctum/csrf-cookie');
            const response = await api.post('/register', { name, email, password });

            if (response.data.token) {
                localStorage.setItem('auth_token', response.data.token);
                navigate('/users');
            } else {
                setError('Registration failed. Please try again.');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <BackgroundWrapper>
            <WideContainer component="main" maxWidth="md">
                <StyledPaper elevation={6}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Logo src={logo} alt="Job Hunt Logo" />
                                <Typography component="h1" variant="h4" gutterBottom color="primary" fontWeight="bold">
                                    Create Account
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <form onSubmit={handleRegister} style={{ width: '100%' }}>
                                <TextField
                                    label="Full Name"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <TextField
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                {error && (
                                    <Typography color="error" variant="body2" style={{ marginTop: 8 }}>
                                        {error}
                                    </Typography>
                                )}
                                <StyledButton
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign Up
                                </StyledButton>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => navigate('/login')}
                                    style={{ marginTop: 16 }}
                                >
                                    Back
                                </Button>
                            </form>
                        </Grid>
                    </Grid>
                </StyledPaper>
                <Footer>
                    <FooterLink href="#">Help</FooterLink>
                    <FooterLink href="#">Privacy</FooterLink>
                    <FooterLink href="#">Terms</FooterLink>
                </Footer>
            </WideContainer>
        </BackgroundWrapper>
    );
};

// Styled Components
const BackgroundWrapper = styled(Box)({
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
});

const WideContainer = styled(Container)({
    maxWidth: '900px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(5),
    borderRadius: '10px',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
}));

const StyledButton = styled(Button)({
    fontWeight: 'bold',
    textTransform: 'uppercase',
    padding: '12px',
    backgroundColor: '#4285F4',
    color: 'white',
    '&:hover': {
        backgroundColor: '#357ae8',
    },
});

const Logo = styled('img')({
    width: '200px',
    marginBottom: '16px',
});

const Footer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '24px',
});

const FooterLink = styled(Link)({
    fontSize: '12px',
    margin: '0 12px',
    textDecoration: 'none',
    color: 'gray',
    '&:hover': {
        textDecoration: 'underline',
    },
});

export default Register;
