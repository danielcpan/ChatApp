import React from 'react';
import decode from 'jwt-decode';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';

import Chats from './containers/Chats';
import Register from './containers/Register';
import Login from './containers/Login';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  try {
    decode(token);
  } catch (err) {
    return false;
  }
  return true;
};

const PrivateRoute = ({ component: Component, ...rest }) => ( // eslint-disable-line react/jsx-props-no-spreading
  <Route
    {...rest} // eslint-disable-line react/jsx-props-no-spreading
    render={(props) => (isAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{ pathname: '/login' }}
      />
    ))}
  />
);

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <PrivateRoute path="/chats/:chatId?" component={Chats} />
    </Switch>
  </BrowserRouter>
);
