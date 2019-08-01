
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// import Home from './views/Home';
import UserForm from './components/users/form/UserForm';
import ChatList from './components/chats/ChatList';
import MessageContainer from './components/messages/MessageContainer';
import Chats from './views/Chats';
// import UsernameField from './components/users/form/UsernameField';

export default () => (
  <BrowserRouter>
    <Switch>
      {/* <Route path="/" exact component={Home} /> */}
      {/* <Route path="/" exact component={Home} /> */}
      <Route path="/userForm" exact component={UserForm} />
      <Route path="/chats" exact component={ChatList} />
      <Route path="/messages" exact component={MessageContainer} />
      {/* <Route path="/chats2" exact component={Chats} /> */}
      <Route path="/chats/:chatId" component={Chats} />
    </Switch>
  </BrowserRouter>
);