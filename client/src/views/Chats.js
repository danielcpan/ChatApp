import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import ChatList from '../components/chats/ChatList';
import MessageContainer from '../components/messages/MessageContainer';
import AppBarUserItem from '../components/AppBarUserItem';

const drawerWidth = 350;

const useStyles = makeStyles(theme => ({
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
}));

const Chats = props => {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  console.log(props)

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <React.Fragment>
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
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

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" elevation={1} color="inherit" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography noWrap className={classes.chatName}>
            {(props.chat.id) && (<span>{props.chat.name}</span>)}
          </Typography>
          <AppBarUserItem username={"tres"}/>
          {/* <div>
          <Typography>
            Welcome Daniel
          </Typography>          
          </div>
          <Button color="inherit">Logout</Button> */}
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>{drawer}</nav>
      {(props.chat.id) && (<MessageContainer/>)}
    </div>
  );
}
const mapStateToProps = state => ({
  chat: state.chats.currentChat,
  user: state.auth.currentUser
})

export default connect(mapStateToProps, null)(Chats);