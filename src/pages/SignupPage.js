import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container } from '@mui/material';
import axios from 'axios';

function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('student');

  const handleSignup = () => {
    axios.post('http://localhost:5000/api/auth/signup', { email, password, name, role })
      .then(() => navigate('/login'))
      .catch((err) => console.error(err));
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: '50px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up
      </Typography>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
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
      <TextField
        label="Role (student/authority)"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSignup}
        style={{ marginTop: '20px' }}
      >
        Sign Up
      </Button>
    </Container>
  );
}

export default SignupPage;