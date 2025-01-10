import React, { useEffect } from "react";
import axios from "axios";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useLocation,
} from "react-router-dom";
import Login from "./Login";
import UserList from "./UserList";
import PrivateRoute from "./PrivateRoute";
import Register from "./Register";
import Navbar from "./Navbar";
import JobSearch from "./JobSearch";

// Helper component to handle navbar visibility
const AppContent = () => {
    const location = useLocation();

    // List of routes where navbar should be hidden
    const hideNavbarRoutes = ["/login", "/register"];
    const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

    return (
        <div className="min-h-screen bg-gray-50">
            {shouldShowNavbar && <Navbar />}
            <main>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="/job-search" replace />}
                    />
                    <Route path="/job-search" element={<JobSearch />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    {/* Make UserList a protected route but keep job-search public */}
                    <Route
                        path="/users"
                        element={
                            <PrivateRoute>
                                <UserList />
                            </PrivateRoute>
                        }
                    />
                    {/* Catch-all redirect to job-search */}
                    <Route
                        path="*"
                        element={<Navigate to="/job-search" replace />}
                    />
                </Routes>
            </main>
        </div>
    );
};

function App() {
    useEffect(() => {
        // Set CSRF token before any other requests
        axios
            .get("http://localhost:8000/sanctum/csrf-cookie")
            .then((response) => {
                console.log("CSRF cookie set:", response);
            })
            .catch((error) => {
                console.error("Error setting CSRF cookie:", error);
            });
    }, []);

    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
