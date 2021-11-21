import React from 'react';

import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import AuthGuard from './hocs/AuthGuard';

/* Route Containers Imports */
import Index from './containers/Index';
import SignUp from './containers/Signup';
import SignIn from './containers/Signin';
import ErrorPage from './containers/Error';
import NotFound from './containers/NotFound';
import ShortLink from './containers/ShortLink';
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

        <Route exact path='/dashboard'>
          <AuthGuard>
            <Dashboard />
          </AuthGuard>
        </Route>

        {/* 404 Not Found */}
        <Route path='/404'>
          <NotFound />
        </Route>

        {/* Error Page */}
        <Route path='/error'>
          <ErrorPage />
        </Route>

        {/* Handle Redirections */}
        <Route path='/:shortSlug'>
          <ShortLink />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
