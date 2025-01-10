import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    TextField,
    Button,
    Typography,
    Container,
    Paper,
    Box,
    Grid,
    Link,
} from "@mui/material";
import { styled } from "@mui/system";
import api from "../services/api";
import logo from "../assets/logo1.png";
import backgroundImage from "../assets/backgroundpic.jpg";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await api.post("/login", { email, password });

            if (response.data.status === true && response.data.token) {
                localStorage.setItem("auth_token", response.data.token);
                navigate("/users");
            } else {
                setError(
                    response.data.message || "Login failed. Please try again."
                );
            }
        } catch (err) {
            if (err.response) {
                const errorMessage =
                    err.response.data.message ||
                    (err.response.status === 422
                        ? "Please check your input."
                        : err.response.status === 401
                        ? "Invalid email or password."
                        : "Login failed. Please try again.");
                setError(errorMessage);
            } else if (err.request) {
                // Handle network errors
                setError(
                    "Cannot connect to the server. Please check your internet connection."
                );
            } else {
                // Handle unexpected errors
                setError(
                    "An unexpected error occurred. Please try again later."
                );
            }
        }
    };

    return (
        <JobSearchPage>
            <Overlay />
            <Content>
                <WideContainer component="main" maxWidth="md">
                    <StyledPaper elevation={6}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                >
                                    <Logo src={logo} alt="Job Hunt Logo" />
                                    <Typography
                                        component="h1"
                                        variant="h4"
                                        gutterBottom
                                        color="primary"
                                        fontWeight="bold"
                                    >
                                        Sign in
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="textSecondary"
                                        style={{ marginBottom: 16 }}
                                    >
                                        to continue
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <form
                                    onSubmit={handleLogin}
                                    style={{ width: "100%" }}
                                >
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Email or Phone"
                                        type="text"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        autoComplete="username"
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        autoComplete="current-password"
                                    />
                                    {error && (
                                        <Typography
                                            color="error"
                                            variant="body2"
                                            style={{ marginTop: 8 }}
                                        >
                                            {error}
                                        </Typography>
                                    )}
                                    <StyledButton
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Login
                                    </StyledButton>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => navigate("/register")}
                                        style={{ marginTop: 16 }}
                                    >
                                        Create Account
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
            </Content>
        </JobSearchPage>
    );
};

const JobSearchPage = styled("div")({
    position: "relative",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "white",
    padding: "20px",
});

const Overlay = styled("div")({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    zIndex: 1,
});

const Content = styled("div")({
    position: "relative",
    zIndex: 2,
});

const WideContainer = styled(Container)({
    maxWidth: "900px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
});

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(5),
    marginTop: theme.spacing(6),
    borderRadius: "10px",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
    display: "flex",
    justifyContent: "center",
}));

const StyledButton = styled(Button)({
    fontWeight: "bold",
    textTransform: "uppercase",
    padding: "12px",
    backgroundColor: "#4285F4",
    color: "white",
    "&:hover": {
        backgroundColor: "#357ae8",
    },
});

const Logo = styled("img")({
    width: "100px",
    marginBottom: "16px",
});

const Footer = styled(Box)({
    display: "flex",
    justifyContent: "center",
    marginTop: "24px",
});

const FooterLink = styled(Link)({
    fontSize: "12px",
    margin: "0 12px",
    textDecoration: "none",
    color: "gray",
    "&:hover": {
        textDecoration: "underline",
    },
});

export default Login;
