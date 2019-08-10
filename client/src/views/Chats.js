import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core';

import AppToolBar from '../components/AppToolBar';
import SideDrawer from '../containers/SideDrawer'
import MessageContainer from '../containers/MessageContainer';

class Chats extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mobileOpen: false,
      setMobileOpen: false,
      toLogin: false,
    }
  }

  componentWillMount() {
    this.props.getCurrentUser();
    this.props.getUsers();
    this.props.getChats();
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  handleLogoutRedirect = () => {
    this.setState({ toLogin: true });
  }

  render() {
    const { classes } = this.props;

    if (this.state.toLogin) {
      return <Redirect to='/login' />
    }

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppToolBar 
          handleDrawerToggle={this.handleDrawerToggle} 
          handleLogoutRedirect={this.handleLogoutRedirect}
          classes={classes}
        />
        <SideDrawer 
          handleDrawerToggle={this.handleDrawerToggle} 
          mobileOpen={this.state.mobileOpen}
        />
        <MessageContainer />
      </div>
    );    
  }
}

Chats.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  getChats: PropTypes.func.isRequired,
}

export default Chats;