import React from 'react';
import { Divider, Typography, Button, IconButton } from '@mui/material';
import { Instagram, Facebook, LinkedIn, Pinterest, Twitter } from '@mui/icons-material';

const FooterComponent = () => {
  const buttonStyle = {
    backgroundColor: '#fff',
    color: 'black',
    margin: '10px',
    boxShadow: 'none',
    '&:hover': {
      color: 'red',
    },
    fontFamily: '"IBM Plex Sans", sans-serif',
  };

  const footerTitleStyle = {
    fontWeight: 'bold',
    margin: '20px 10px 10px 10px',
    fontFamily: '"IBM Plex Sans", sans-serif',
  };

  const socialMediaStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
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

      <footer style={{ padding: '40px 0' }}>
        <Typography variant="h6" align="center" style={footerTitleStyle}>
          Inferno Blog
        </Typography>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
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

        <div style={{ ...socialMediaStyle, marginTop: '30px' }}>
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
