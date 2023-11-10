// import React, { useState } from 'react';
// import {
//   AppBar,
//   Box,
//   Toolbar,
//   IconButton,
//   Typography,
//   Menu,
//   MenuItem,
//   Button,
//   Avatar,
//   Tooltip,
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { Link } from 'react-router-dom';
// import AdbIcon from '@mui/icons-material/Adb';
// import { useAuth } from './Auth/AuthContext'; // Import your AuthContext

// const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Setting1', 'Setting2', 'Setting3'];

// function Header() {
//   const [anchorElNav, setAnchorElNav] = useState(null);
//   const [anchorElUser, setAnchorElUser] = useState(null);
//   const { currentUser, signOut } = useAuth();

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };

//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   return (
//     <AppBar position="static" color="primary">
//       <Toolbar>
//         <AdbIcon sx={{ display: 'none', mr: 1 }} />
//         <Typography
//           variant="h6"
//           noWrap
//           component={Link}
//           to="/"
//           sx={{
//             mr: 2,
//             flexGrow: 1,
//             fontFamily: 'monospace',
//             fontWeight: 700,
//             letterSpacing: '.3rem',
//             color: 'inherit',
//             textDecoration: 'none',
//           }}
//         >
//           LOGO
//         </Typography>

//         <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//           <IconButton
//             size="large"
//             aria-label="menu"
//             onClick={handleOpenNavMenu}
//             color="inherit"
//           >
//             <MenuIcon />
//           </IconButton>
//           <Menu
//             anchorEl={anchorElNav}
//             open={Boolean(anchorElNav)}
//             onClose={handleCloseNavMenu}
//             sx={{ display: { xs: 'block', md: 'none' } }}
//           >
//             {pages.map((page) => (
//               <MenuItem key={page} onClick={handleCloseNavMenu}>
//                 <Typography variant="body1" textAlign="center">
//                   {page}
//                 </Typography>
//               </MenuItem>
//             ))}
//           </Menu>
//         </Box>

//         <Typography
//           variant="h5"
//           noWrap
//           component={Link}
//           to="/"
//           sx={{
//             mr: 2,
//             flexGrow: 1,
//             display: { xs: 'flex', md: 'none' },
//             fontFamily: 'monospace',
//             fontWeight: 700,
//             letterSpacing: '.3rem',
//             color: 'inherit',
//             textDecoration: 'none',
//           }}
//         >
//           LOGO
//         </Typography>

//         <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//           {pages.map((page) => (
//             <Button
//               key={page}
//               onClick={handleCloseNavMenu}
//               sx={{ mx: 1, color: 'white' }}
//             >
//               {page}
//             </Button>
//           ))}
//         </Box>

//         <Box sx={{ flexGrow: 0 }}>
//           {currentUser ? (
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt="User Avatar" src="/static/images/avatar.jpg" />
//               </IconButton>
//             </Tooltip>
//           ) : (
//             <Button
//               variant="contained"
//               color="secondary"
//               component={Link}
//               to="/signup"
//             >
//               {currentUser ? 'Settings' : 'Get Started'}
//             </Button>
//           )}
//         </Box>

//         {currentUser && (
//           <Menu
//             anchorEl={anchorElUser}
//             open={Boolean(anchorElUser)}
//             onClose={handleCloseUserMenu}
//             sx={{ mt: '45px' }}
//           >
//             {settings.map((setting) => (
//               <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                 <Typography variant="body1" textAlign="center">
//                   {setting}
//                 </Typography>
//               </MenuItem>
//             ))}
//             <MenuItem
//               onClick={() => {
//                 signOut();
//                 handleCloseUserMenu();
//               }}
//             >
//               Sign Out
//             </MenuItem>
//           </Menu>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// }

// export default Header;



// Header.js

import React, { useState } from 'react';
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
import Search from './Search'; // Import the Search component
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

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="menu"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElNav}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            {allPages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography variant="body1" textAlign="center">
                  {page}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {allPages.map((page) => (
            <Button
              key={page}
              onClick={handleCloseNavMenu}
              sx={{ mx: 1, color: 'black' }}
            >
              {page}
            </Button>
          ))}
        </Box>

        <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
          {searchOpen && <Search />}
          {/* Add the Search button */}
          <IconButton
            size="large"
            aria-label="search"
            onClick={handleSearchSubmit}
            color="inherit"
          >
            <SearchIcon />
          </IconButton>
        </Box>

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
    </AppBar>
  );
}

export default Header;
