import React, { useEffect, useState, useCallback } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Container, Pagination } from '@mui/material';
import api from '../services/api';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Fetch users with authentication
    const fetchUsers = useCallback(async () => {
        try {
            const token = localStorage.getItem('auth_token'); // Get the token from localStorage

            // If token exists, set it in Authorization header
            if (token) {
                const response = await api.get(`/users?page=${currentPage}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send the token in the header
                    },
                });

                if (response.status === 200) {
                    setUsers(response.data.data); // Store users in state
                    setTotalPages(response.data.last_page); // Store total pages from Laravel pagination
                }
            } else {
                console.error("No authentication token found.");
                window.location.href = '/login'; // Redirect to login page if no token
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            if (error.response && error.response.status === 401) {
                // Redirect to login page if unauthorized (e.g., token expired)
                localStorage.removeItem('auth_token'); // Clear token from localStorage
                window.location.href = '/login'; // Redirect to login page
            }
        }
    }, [currentPage]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <Container>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
            />
        </Container>
    );
};

export default UserList;
