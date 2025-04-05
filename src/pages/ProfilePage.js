import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, TextField, Button, Typography, Container } from '@mui/material';
import Navbar from '../components/Navbar';

function ProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);
  const [name, setName] = useState(user.name);

  const handleUpdateProfile = () => {
    dispatch({ type: 'SET_USER', payload: { ...user, name } });
  };

  const userPosts = posts.filter((post) => post.userId === user.id);

  return (
    <div>
      <Navbar />
      <Container maxWidth="sm" style={{ marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Card style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <CardContent>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateProfile}
              style={{ marginTop: '10px', backgroundColor: '#1976d2' }}
            >
              Update Profile
            </Button>
            <Typography variant="body1" style={{ marginTop: '10px' }}>
              Credits: {user.credits}
            </Typography>
            <Typography variant="body1">
              Warnings: {user.warnings}
            </Typography>
          </CardContent>
        </Card>

        <Typography variant="h6" style={{ marginTop: '20px' }}>
          Your Issues
        </Typography>
        {userPosts.map((post) => (
          <Card key={post._id} style={{ marginBottom: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography>{post.text}</Typography>
              <Typography variant="body2" color="textSecondary">
                Upvotes: {post.upvotes}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Container>
    </div>
  );
}

export default ProfilePage;