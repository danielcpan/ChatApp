
import React from 'react';
import decode from 'jwt-decode';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Home from './views/Home';
import UserForm from './components/users/form/UserForm';
import ChatList from './components/chats/ChatList';
import MessageContainer from './components/messages/MessageContainer';
import Chats from './views/Chats';
import ChatForm from './components/chats/ChatForm';
import Login from './views/Login'
// import UsernameField from './components/users/form/UsernameField';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  try {
    decode(token);
  } catch (err) {
    return false;
  }
  return true;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login' }}
        />
      ))
    }
  />
);

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={UserForm} />
      <Route path="/login" exact component={Login} />
      <Route path="/chats" exact component={ChatList} />
      <PrivateRoute path="/chats/:chatId" exact component={Chats} />
      {/* <Route path="/messages" exact component={MessageContainer} /> */}
      {/* <Route path="/chats2" exact component={Chats} /> */}
      {/* <Route path="/chats/new" exact component={ChatForm} /> */}
      {/* <Route path="/chats/:chatId" component={Chats} /> */}

    </Switch>
  </BrowserRouter>
);