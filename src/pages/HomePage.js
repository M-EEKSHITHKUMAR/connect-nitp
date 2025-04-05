import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardContent, TextField, Typography, Container } from '@mui/material';
import Navbar from '../components/Navbar';

function HomePage() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user);
  const [newPost, setNewPost] = useState('');
  const [newTag, setNewTag] = useState('');

  const handlePostSubmit = () => {
    if (!newPost.trim()) return; // Prevent empty posts
    const post = {
      _id: Date.now().toString(), // Mock ID
      text: newPost,
      tags: newTag.split(',').map((tag) => tag.trim()).filter((tag) => tag),
      upvotes: 0,
      status: 'open',
      userId: user.id,
    };
    dispatch({ type: 'ADD_POST', payload: post });
    setNewPost('');
    setNewTag('');
  };

  const handleUpvote = (postId) => {
    const updatedPosts = posts.map((post) =>
      post._id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
    );
    dispatch({ type: 'SET_POSTS', payload: updatedPosts });
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="md" style={{ marginTop: '20px', padding: '0 16px' }}>
        <Typography variant="h4" gutterBottom>
          College Issue Reporting
        </Typography>
        <Card style={{ marginBottom: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <CardContent>
            <TextField
              label="Report an Issue"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              fullWidth
              multiline
              rows={2}
            />
            <TextField
              label="Tags (comma-separated)"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              fullWidth
              style={{ marginTop: '10px' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handlePostSubmit}
              style={{ marginTop: '10px', backgroundColor: '#1976d2' }}
            >
              Submit Issue
            </Button>
          </CardContent>
        </Card>

        {posts.map((post) => (
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
                variant="outlined"
                color="primary"
                onClick={() => handleUpvote(post._id)}
                style={{ marginTop: '10px' }}
              >
                Upvote
              </Button>
            </CardContent>
          </Card>
        ))}
      </Container>
    </div>
  );
}

export default HomePage;