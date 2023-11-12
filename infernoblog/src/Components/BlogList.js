import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import ReaderCard from './RelatedMovie';

const truncateContent = (content, maxLength) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');

  const images = doc.querySelectorAll('img');
  images.forEach((image) => {
    image.parentNode.removeChild(image);
  });

  const textContent = doc.body.textContent || '';

  return textContent.length > maxLength ? `${textContent.substring(0, maxLength)}...` : textContent;
};

const BlogList = () => {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const db = getFirestore();
        const blogsCollection = collection(db, 'blogs');
        const blogsSnapshot = await getDocs(blogsCollection);

        if (blogsSnapshot.empty) {
          console.log('No matching documents.');
          return;
        }

        const blogsData = [];

        blogsSnapshot.forEach((doc) => {
          const data = doc.data();
          blogsData.push(data);
        });

        // Shuffle the blogs and select the first 6
        const shuffledBlogs = blogsData.sort(() => 0.5 - Math.random());
        const selectedBlogs = shuffledBlogs.slice(0, 6);

        setBlogData(selectedBlogs);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchBlogData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <>
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 10 }}>
        {blogData.map((blog) => (
          <Card
            key={blog.id}
            elevation={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              margin: '10px',
              transition: 'transform 0.5s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <Box
              component="img"
              sx={{
                height: 200,
                objectFit: 'cover',
                borderRadius: '10px',
              }}
              alt="Blog Cover"
              src={blog.profile || 'https://source.unsplash.com/featured/?profile'}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                {blog.title}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                {blog.category} | {blog.author}
              </Typography>
              <Typography variant="body2" paragraph>
                {truncateContent(blog.content, 100)}
              </Typography>
              <Button
                component={Link}
                to={`/blog/${blog.slug}`}
                size="small"
                color="primary"
                variant="outlined"
              >
                Read More
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
      <ReaderCard />
    </>
  );
};

export default BlogList;