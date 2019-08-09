import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import { 
  AppBar, 
  CssBaseline, 
  Drawer, 
  Hidden, 
  IconButton, 
  Toolbar, 
  Typography 
} from '@material-ui/core';

import ChatList from '../components/chats/ChatList';
import MessageContainer from '../components/messages/MessageContainer';
import AppBarUserItem from '../components/AppBarUserItem';

import { getCurrentUser } from '../actions/authActions';
import { getChat, getChats } from '../actions/chatActions';

const drawerWidth = 350;

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100vh',
    overflow: 'auto'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  chatName: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 28,
    flexGrow: 1,
  },
  content: {
    marginTop: theme.spacing(10),
    flexGrow: 1,
  },  
});

class Chats extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mobileOpen: false,
      setMobileOpen: false,
    }
  }

  async componentWillMount() {
    await this.props.getCurrentUser();
    await this.props.getChats();
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
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
          <ChatList />
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
          <ChatList />
        </Drawer>
      </Hidden>
    </React.Fragment>
  );

  render() {
    const { classes } = this.props;

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
              {(this.props.chat.id) && (<span>{this.props.chat.name}</span>)}
            </Typography>
            <AppBarUserItem />
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>{this.renderDrawer(classes)}</nav>
        {(this.props.chat.id) && (<MessageContainer/>)}
      </div>
    );    
  }
}
const mapStateToProps = state => ({
  chat: state.chats.currentChat,
  user: state.auth.currentUser
})

const mapDispatchToProps = dispatch => ({
  getChat: (id) => dispatch(getChat(id)),
  getChats: () => dispatch(getChats()),
  getCurrentUser: () => dispatch(getCurrentUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Chats));