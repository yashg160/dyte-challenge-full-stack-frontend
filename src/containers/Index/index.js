import React from 'react';

import { useHistory } from 'react-router';
import Navbar from '../../components/Navbar';
import { Container, Grid, Button } from '@material-ui/core';

import Illustration from '../../assets/undraw_loving_it_re_jfh4.svg';
import styles from './Index.module.scss';

const Index = (props) => {
  const history = useHistory();

  const handleGetStarted = () => {};

  return (
    <div>
      <Navbar />
      <Container maxWidth='lg'>
        <Grid
          container
          spacing={8}
          direction='row'
          className={styles.bannerGridContainer}
        >
          <Grid item sm={12} md={6}>
            <h1 className={styles.tagLine}>Short links, big results</h1>
            <h2 className={styles.tagLineDescription}>
              A URL shortener that helps you bring more people to you business
              and build your brand
            </h2>

            <a href='/signup'>
              <Button
                color='primary'
                variant='contained'
                onClick={() => handleGetStarted()}
                className={styles.getStartedButton}
              >
                Get Started for Free
              </Button>
            </a>
          </Grid>

          <Grid item sm={12} md={6}>
            <div className={styles.imageWrapper}>
              <img
                src={Illustration}
                alt='Home Page Illustration'
                className={styles.illustration}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Index;
