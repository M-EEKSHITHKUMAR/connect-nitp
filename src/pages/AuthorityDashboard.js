import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardContent, Typography, Container } from '@mui/material';
import Navbar from '../components/Navbar';

function AuthorityDashboard() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user);

  const handleResolve = (postId) => {
    const updatedPost = posts.find((post) => post._id === postId);
    updatedPost.status = 'resolved';
    dispatch({ type: 'UPDATE_POST', payload: updatedPost });
  };

  if (user.role !== 'authority') {
    return (
      <div>
        <Navbar />
        <Container maxWidth="md" style={{ marginTop: '20px' }}>
          <Typography variant="h5">Access Denied: You must be an authority to view this page.</Typography>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Container maxWidth="md" style={{ marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Authority Dashboard
        </Typography>
        {posts
          .filter((post) => post.status !== 'resolved')
          .sort((a, b) => b.upvotes - a.upvotes)
          .map((post) => (
            <Card key={post._id} style={{ marginBottom: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
              <CardContent>
                <Typography>{post.text}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Tags: {post.tags.join(', ')}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Upvotes: {post.upvotes}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleResolve(post._id)}
                  style={{ marginTop: '10px' }}
                >
                  Mark Resolved
                </Button>
              </CardContent>
            </Card>
          ))}
      </Container>
    </div>
  );
}

export default AuthorityDashboard;