import React, { useState } from "react";
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
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Router } from "@mui/icons-material";



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
    setIsLoggedIn(false)
    alert("Logout Succesful")

    console.log("Logout Succesful");

  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [open, setOpen] = React.useState(false);
  const [profileImage,setProfileImage]=React.useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [isLoggedIn, setIsLoggedIn] = useState(true);

  function handleProfileClick() {
    if (isLoggedIn) {
      // redirect to user profile page
      window.location.href = "/Profile";
    } else {
      // redirect to login page
      window.location.href = "/login";
    }
  }
  
  const navigate = useNavigate();
  const handleProfile = () => {

    if (isLoggedIn) {

    navigate('/Profile')
    }
    else{
      handleOpen()
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
                <Avatar src={profileImage} />
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
                  <Button onClick={handleProfile} className="button" name="MY profile">MYprofile</Button>
                  {/* <Link to = "/Profile"><Button onClick={handleProfile} className="button" name="MY profile">MYprofile</Button> </Link> */}

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

                            if (credentialResponse.credential !== undefined) {
                              var decoded:object = jwt_decode(credentialResponse.credential);
                              console.log(decoded);
                              var a=Object.values(decoded);
                              setProfileImage(a[8]);


                            }


                          }}
                          onError={() => {
                            console.log('Login Failed');
                          }} />
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