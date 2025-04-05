import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container } from '@mui/material';
import Navbar from '../components/Navbar';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Mock login
    dispatch({
      type: 'SET_USER',
      payload: { id: 'mock-user-1', name: 'Test User', credits: 10, role: 'student', warnings: 0 },
    });
    navigate('/');
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="xs" style={{ marginTop: '50px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          style={{ marginTop: '20px', backgroundColor: '#1976d2' }}
        >
          Login
        </Button>
      </Container>
    </div>
  );
}

export default LoginPage;