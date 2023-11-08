import React from 'react';
import { Container, Card, CardContent, Typography, Button } from '@mui/material';

const BlogListMUI = () => {
  const blogData = [
    { title: 'Blog Post 1', content: 'This is the content of Blog Post 1.' },
    { title: 'Blog Post 2', content: 'This is the content of Blog Post 2.' },
    // Add more blog posts here
  ];

  return (
    <Container>
      {blogData.map((blog, index) => (
        <Card key={index} variant="outlined" style={{ margin: '16px 0' }}>
          <CardContent>
            <Typography variant="h5">{blog.title}</Typography>
            <Typography variant="body2">{blog.content}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default BlogListMUI;
