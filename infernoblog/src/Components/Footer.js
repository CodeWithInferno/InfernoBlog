import React from 'react';
import { Divider, Typography, Button, IconButton } from '@mui/material';
import { Instagram, Facebook, LinkedIn, Pinterest, Twitter } from '@mui/icons-material';
// import './BlogPost.css';

const FooterComponent = () => {
  const buttonStyle = {
    backgroundColor: '#fff', // White background
    color: 'black', // Black text color
    margin: '0 20px',
    marginTop: '20px', // Adjust the margin as needed

    boxShadow: 'none', // Remove the box shadow
    '&:hover': {
      color: 'red', // Change color on hover
    },
    fontFamily: '"IBM Plex Sans", sans-serif', // Add font-family property
  };

  const footerTitleStyle = {
    fontWeight: 'bold',
    margin: '20px 10px 10px 10px',
    fontFamily: '"IBM Plex Sans", sans-serif',
    marginTop: '20px', // Adjust the margin as needed
    // Add font-family property
  };

  const socialMediaStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px', // Adjust the margin as needed
  };

  return (
    <div>
            <Divider
        variant="middle"
        sx={{
          backgroundImage:
          'linear-gradient(90deg, transparent, #000, transparent)',
          height: '1px',
          border: 'none',
          marginBlock: '10px',
        }}
      />

      <footer>
        <Typography variant="h6" align="center" style={footerTitleStyle}>
          Inferno Blog
        </Typography>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <Button variant="contained" style={buttonStyle}>
            Button 1
          </Button>
          <Button variant="contained" style={buttonStyle}>
            Button 2
          </Button>
          <Button variant="contained" style={buttonStyle}>
            Button 3
          </Button>
          <Button variant="contained" style={buttonStyle}>
            Button 4
          </Button>
          <Button variant="contained" style={buttonStyle}>
            Button 5
          </Button>
        </div>

        <div style={socialMediaStyle}>
          <IconButton>
            <Instagram />
          </IconButton>
          <IconButton>
            <Facebook />
          </IconButton>
          <IconButton>
            <LinkedIn />
          </IconButton>
          <IconButton>
            <Pinterest />
          </IconButton>
          <IconButton>
            <Twitter />
          </IconButton>
        </div>

        {/* Your footer content goes here */}
      </footer>
    </div>
  );
};

export default FooterComponent;
