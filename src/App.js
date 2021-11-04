import React from 'react';

import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import AuthGuard from './hocs/AuthGuard';

/* Route Containers Imports */
import Index from './containers/Index';
import SignUp from './containers/Signup';
import SignIn from './containers/Signin';
import Dashboard from './containers/Dashboard';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Index />
        </Route>

        <Route exact path='/signup'>
          <SignUp />
        </Route>

        <Route exact path='/signin'>
          <SignIn />
        </Route>

        <AuthGuard>
          <Route exact path='/dashboard'>
            <Dashboard />
          </Route>
        </AuthGuard>
      </Switch>
    </Router>
  );
};

export default App;
