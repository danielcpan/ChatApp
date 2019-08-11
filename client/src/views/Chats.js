import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { CssBaseline } from '@material-ui/core';

import AppToolBar from '../components/AppToolBar';
import SideDrawer from '../containers/SideDrawer';
import MessageContainer from '../containers/MessageContainer';

class Chats extends React.Component {
  state = {
    mobileOpen: false,
    toLogin: false,
  };

  componentWillMount() {
    const { chatId } = this.props.match.params || {};
    this.props.getCurrentUser();
    this.props.getUsers();
    this.props.getChats();
    if (chatId) {
      this.props.getChat(chatId);
    }
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }

  handleLogoutRedirect = () => {
    this.setState({ toLogin: true });
  }

  render() {
    const { chat, classes } = this.props;

    if (this.state.toLogin) {
      return <Redirect to="/login" />;
    }

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppToolBar
          chat={chat}
          handleDrawerToggle={this.handleDrawerToggle}
          handleLogoutRedirect={this.handleLogoutRedirect}
          classes={classes}
        />
        <SideDrawer
          handleDrawerToggle={this.handleDrawerToggle}
          mobileOpen={this.state.mobileOpen}
        />
        {(this.props.match.params.chatId && chat.id) && (<MessageContainer chat={chat} />)}
      </div>
    );
  }
}

Chats.propTypes = {
  chat: PropTypes.object,
  getCurrentUser: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  getChats: PropTypes.func.isRequired,
  getChat: PropTypes.func.isRequired,
};

export default withRouter(Chats);
