// import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Divider } from '@mui/material';
import { Button, MenuList } from '@mui/material';
import Modal from '@mui/material/Modal';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { googleLogout } from "@react-oauth/google";

import React, { useState } from "react";

const responseGoogle = (response: any) => {
  console.log(response);
}



const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  
};

function Navbar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);


  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const logoutHandler = () => {

    googleLogout();

    console.log("Logout Succesful");

  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
//testing for github

const [isLoggedIn, setIsLoggedIn] = useState(false);

function handleProfileClick() {
  if (isLoggedIn) {
    // redirect to user profile page
    window.location.href = "/Profile";
  } else {
    // redirect to login page
    window.location.href = "/login";
  }
}

  return (
    
    <AppBar position="static">
      
      
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
          </Box>
          

          <Box sx={{ flexGrow: 0 }}>
      

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src="https://lh3.googleusercontent.com/a/AEdFTp6g12SaYAjEIJFwe0No3L4Sxgbxv-XyOgcUcsesjw=s96-c"/>
              </IconButton>
             
            </Tooltip>
            
            
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
              <MenuItem onClick={handleCloseUserMenu}>
              <MenuList>
              {/* <Button onClick={handleOpen}>My Profile</Button> */}
              {/* <a href="#" onClick={handleProfileClick}>My Profile</a> */}
              <a href="aboutus.html">My Profile</a>
            
              <Typography><Button>Wishlist</Button></Typography>
              <Typography><Button>Cart</Button><Divider /></Typography>
              
             
              <Button onClick={handleOpen}>Login</Button>
              <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              >
              <Box sx={style}>
            
              

              <GoogleOAuthProvider clientId="225817550374-bcd47pau1t740ghketrui4pdqgm9eha3.apps.googleusercontent.com">
              <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse.credential);
    
if (credentialResponse.credential !== undefined) 
{ 
  var decoded = jwt_decode(credentialResponse.credential); 
  console.log(decoded); 
}


  }}
  onError={() => {
    console.log('Login Failed');
  }}/>
                </GoogleOAuthProvider>
              </Box>
              </Modal>
              
              <Typography><Button onClick={logoutHandler}>Logout</Button></Typography>
              </MenuList>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;