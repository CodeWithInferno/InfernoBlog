






import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { getFirestore, collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { Typography, Divider, Button } from '@mui/material';

const BlogList = () => {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const db = getFirestore();
        const blogsCollection = collection(db, 'blogs');
        const blogsQuery = query(blogsCollection, orderBy('createdAt', 'desc'), limit(3));

        const blogsSnapshot = await getDocs(blogsQuery);

        if (blogsSnapshot.empty) {
          console.log('No matching documents.');
          return;
        }

        const blogsData = [];

        blogsSnapshot.forEach((doc) => {
          const data = doc.data();
          blogsData.push(data);
        });

        setBlogData(blogsData);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchBlogData();
  }, []);

  if (!blogData.length) {
    return null;
  }

  // Filter blogs based on the category 'movie'
  const movieBlogs = blogData.filter((blog) => blog.category === 'movie');

  if (!movieBlogs.length) {
    return null;
  }

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

  return (
    <div>
      <style>
        {`
          .blogCard {
            transition: transform 0.5s ease-in-out;
          }

          .blogCard:hover {
            transform: scale(1.05);
          }

          .blogContainer {
            display: flex;
            flex-direction: column;
            minHeight: 250px; /* Adjust this value based on your needs */
          }
        `}
      </style>
      <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: 16, marginLeft: 50 }}>
        Related To Movies
      </Typography>
      <Divider
        variant="middle"
        sx={{
          backgroundImage: 'linear-gradient(90deg, transparent, red 250px, #fff 20px, transparent)',
          height: '2px',
          border: 'none',
        }}
      />
      <div style={{ padding: 16, maxWidth: 900, margin: 'auto' }}>
        {movieBlogs.map((blog) => (
          <Link key={blog.id} to={`/blog/${blog.slug}`} style={{ textDecoration: 'none' }}>
            <Card
              className="blogCard"
              style={{
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                padding: 0,
                maxHeight: 200,
              }}
            >
              {/* Left side with profile picture */}
              <img
                src={blog.profile || 'https://source.unsplash.com/featured/?profile'}
                alt="Profile"
                style={{ width: 400, height: '100%', objectFit: 'cover', borderRadius: '10px', padding: 0, margin: 0 }}
              />

              {/* Right side with blog information */}
              <div className="blogContainer" style={{ marginLeft: 16, flex: 1 }}>
                <CardContent>
                  <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: 8 }}>
                    {blog.title}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" style={{ marginBottom: 8 }}>
                    {blog.category}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {truncateContent(blog.content, 100)}
                  </Typography>
                </CardContent>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
