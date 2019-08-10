import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Avatar, IconButton, Menu, MenuItem } from '@material-ui/core';
import { logout } from '../actions/authActions';

const AppToolBarUserItem = props => {
  const { user, handleLogoutRedirect } = props
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleLogout() {
    handleLogoutRedirect();
    props.logout();
  }

  return (
    <div>
      Welcome {user.username}
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        {(user.username) && (
          <Avatar>{user.username.charAt(0).toUpperCase()}</Avatar>
        )}
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

AppToolBarUserItem.propTypes = {
  username: PropTypes.string,
}

const mapStateToProps = state => ({
  user: state.auth.currentUser
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(AppToolBarUserItem);