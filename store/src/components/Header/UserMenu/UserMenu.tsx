import { AccountCircle } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { FC, useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { setUserLoggedOut } from '../../../store/reducers/authSlice';

const UserMenu: FC = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickLogin = () => {
    handleCloseUserMenu();
    navigate('/login');
  };

  const handleClickLogout = () => {
    handleCloseUserMenu();
    dispatch(setUserLoggedOut());
  };

  const handleClickSignUp = () => {
    handleCloseUserMenu();
    navigate('/register');
  };

  return (
    <Box>
      <Tooltip title="User menu">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <AccountCircle
            fontSize="large"
            color={`${isLoggedIn ? 'primary' : 'disabled'}`}
          />
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
        {isLoggedIn ? (
          <MenuItem key="logout" onClick={handleClickLogout}>
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        ) : (
          [
            <MenuItem key="login" onClick={handleClickLogin}>
              <Typography textAlign="center">Login</Typography>
            </MenuItem>,
            <MenuItem key="signUp" onClick={handleClickSignUp}>
              <Typography textAlign="center">Sign Up</Typography>
            </MenuItem>,
          ]
        )}
      </Menu>
    </Box>
  );
};

export default UserMenu;
