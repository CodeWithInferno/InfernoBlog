


// Header.js

import React, { useState } from 'react';
import CategoryList from './Categorylist';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Tooltip,
  Divider,
  InputBase,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import AdbIcon from '@mui/icons-material/Adb';
 // Import the Search component
import { useAuth } from './Auth/AuthContext';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Setting1', 'Setting2', 'Setting3'];

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { currentUser, signOut } = useAuth();
  const [allPages, setAllPages] = useState(pages);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleToggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    const filteredPages = pages.filter((page) =>
      page.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setAllPages(filteredPages);
  };

  const handleSearchSubmit = () => {
    // Call the handleSearch function from Search.js with the searchQuery
    handleSearch(searchQuery);
  };
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
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <AdbIcon sx={{ display: 'none', mx: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/"
          sx={{
            mx: 1,
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'black',
            textDecoration: 'none',
          }}
        >
          LOGO
        </Typography>





        <Box sx={{ flexGrow: 0 }}>
          {currentUser ? (
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mx: 1 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar.jpg" />
              </IconButton>
            </Tooltip>
          ) : (
            <>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/signup"
                sx={{ mx: 1 }}
              >
                Get Started
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/settings"
              >
                Settings
              </Button>
            </>
          )}
        </Box>

        {currentUser && (
          <Menu
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            sx={{ mt: '45px' }}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography variant="body1" textAlign="center">
                  {setting}
                </Typography>
              </MenuItem>
            ))}
            <Divider
              variant="middle"
              sx={{
                backgroundImage:
                  'linear-gradient(90deg, transparent, #000, transparent)',
                height: '1px',
                border: 'none',
              }}
            />
            <MenuItem
              onClick={() => {
                signOut();
                handleCloseUserMenu();
              }}
            >
              Sign Out
            </MenuItem>
          </Menu>
        )}
      </Toolbar>
      <Divider variant="middle" />
      <CategoryList onSelectCategory={(category) => console.log(`Selected category: ${category}`)} />
    </AppBar>
  );
}

export default Header;
