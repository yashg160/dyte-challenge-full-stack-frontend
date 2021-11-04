import React from 'react';

import { useHistory } from 'react-router';
import {
  AppBar,
  Button,
  Toolbar,
  Container,
  Typography,
} from '@material-ui/core';

import styles from './Navbar.module.scss';

const Navbar = () => {
  const history = useHistory();

  const handleLogin = () => {
    history.push('/signin');
  };

  const handleGetStarted = () => {
    history.push('/signup');
  };

  return (
    <div className={styles.wrapper}>
      <AppBar position='static' className={styles.appBar}>
        <Toolbar className={styles.toolBar}>
          <Container maxWidth='lg' className={styles.container}>
            <div className={styles.introContent}>
              <Button variant='text' className={styles.loginButton}>
                Solutions
              </Button>

              <Button variant='text' className={styles.loginButton}>
                About
              </Button>

              <Button variant='text' className={styles.loginButton}>
                Contact
              </Button>
            </div>

            <div className={styles.sideContent}>
              <a href='/signin'>
                <Button
                  variant='text'
                  className={styles.loginButton}
                  onClick={() => handleLogin()}
                >
                  Log In
                </Button>
              </a>

              <a href='/signup'>
                <Button
                  color='primary'
                  variant='contained'
                  className={styles.getStartedButton}
                  onClick={() => handleGetStarted()}
                >
                  Get Started Free
                </Button>
              </a>
            </div>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
