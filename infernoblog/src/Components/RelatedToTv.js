import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';



const RelatedToTv = () => {
  // Sample data for TV-related content
  const tvContent = [
    {
      id: 1,
      image: 'https://source.unsplash.com/featured/?tv',
      text: 'Sample Text 1',
    },
    {
      id: 2,
      image: 'https://source.unsplash.com/featured/?tv',
      text: 'Sample Text 2',
    },
    {
      id: 3,
      image: 'https://source.unsplash.com/featured/?tv',
      text: 'Sample Text 3',
    },
    {
      id: 4,
      image: 'https://source.unsplash.com/featured/?tv',
      text: 'Sample Text 4',
    },
    // Add more items as needed
  ];

  return (
    <Grid container spacing={3}>
      {/* First row with three items */}
      {tvContent.slice(0, 3).map((item) => (
        <Grid key={item.id} item xs={12} sm={4}>
          <Card>
            {/* Top part with Unsplash image */}
            <img
              src={item.image}
              alt="TV"
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
            />

            {/* Bottom part with sample text */}
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                {item.text}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}

      {/* Second row with one large item */}
      <Grid item xs={12} sm={8}>
        {tvContent.slice(3).map((item) => (
          <Card key={item.id} style={{ marginBottom: '16px' }}>
            {/* Top part with Unsplash image */}
            <img
              src={item.image}
              alt="TV"
              style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
            />

            {/* Bottom part with sample text */}
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                {item.text}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Grid>
  );
};

export default RelatedToTv;
