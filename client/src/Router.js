
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Home from './views/Home';
import UserForm from './components/users/form/UserForm';
// import UsernameField from './components/users/form/UsernameField';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/userForm" exact component={UserForm} />
    </Switch>
  </BrowserRouter>
);