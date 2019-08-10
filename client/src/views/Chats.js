import React from 'react';
import PropTypes from 'prop-types';
import MenuIcon from '@material-ui/icons/Menu';
import { Redirect } from 'react-router-dom'
import { 
  AppBar, 
  CssBaseline, 
  Drawer, 
  Hidden, 
  IconButton, 
  Toolbar, 
  Typography 
} from '@material-ui/core';

import UsersList from '../containers/UserList'
import MessageContainer from '../containers/MessageContainer';
import AppBarUserItem from '../components/AppBarUserItem';

class Chats extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mobileOpen: false,
      setMobileOpen: false,
      toLogin: false,
    }
  }

  async componentWillMount() {
    await this.props.getCurrentUser();
    await this.props.getUsers();
    // await this.props.getChats();
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  handleLogoutRedirect = () => {
    this.setState({ toLogin: true });
  }

  renderDrawer = classes => (
    <React.Fragment>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          open={this.state.mobileOpen}
          onClose={this.handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <UsersList />
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <UsersList />
        </Drawer>
      </Hidden>
    </React.Fragment>
  );

  render() {
    const { classes } = this.props;

    if (this.state.toLogin) {
      return <Redirect to='/login' />
    }

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" elevation={1} color="inherit" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography noWrap className={classes.chatName}>
              Chat App
            </Typography>
            <AppBarUserItem handleLogoutRedirect={this.handleLogoutRedirect}/>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>{this.renderDrawer(classes)}</nav>
        <MessageContainer />
      </div>
    );    
  }
}

Chats.propTypes = {
  chat: PropTypes.object.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  getChats: PropTypes.func.isRequired
}

export default Chats;