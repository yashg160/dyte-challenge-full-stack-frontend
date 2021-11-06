import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';

import {
  fetchDashboardAnalytics,
  fetchUserLinks,
} from '../../services/DashboardService';

import { Grid, Button } from '@material-ui/core';
import MainNavbar from '../../components/MainNavbar';

import cx from 'classnames';
import styles from './Dashboard.module.scss';
import CreateShortLink from '../../components/CreateShortLink';

const Dashboard = (props) => {
  const authData = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [allLinksData, setAllLinksData] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);

  useEffect(() => {
    fetchData().then(() => setIsLoading(false));
  }, []);

  const fetchData = () => {
    const promises = [fetchDashboardAnalytics(), fetchUserLinks()];

    return Promise.all(promises)
      .then(([responseData1, responseData2]) => {
        setPerformanceData(responseData1.data);
        setAllLinksData(responseData2.data);
      })
      .catch((errorData) => {
        console.log('Error While Fetchin Data', errorData);
      });
  };

  const handleCreateLink = () => {
    setIsCreateLinkModalOpen(true);
  };

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <section className={styles.pageWrapper}>
      <MainNavbar
        primaryActionButtonText='CREATE LINK'
        primaryActionButtonClick={() => handleCreateLink()}
      />

      <div className={styles.banner}>
        <Button size='small' variant='contained'>
          UPGRADE
        </Button>
      </div>

      <div className={styles.analyticsWrapper}>
        <Grid container justifyContent='flex-start' alignItems='stretch'>
          <Grid item sm={12} md={3}>
            <div className={styles.performanceWrapper}>
              <h4 className={styles.heading}>Performance Analytics</h4>

              <div className={styles.perfIndicator}>
                <div className={styles.iconWrapper}></div>
                <div className={styles.data}>
                  <p className={cx(styles.dataFigure, styles.larger)}>
                    {performanceData.totalClicks ?? 0}
                  </p>
                  <h5 className={styles.dataName}>TOTAL CLICKS</h5>
                </div>
              </div>

              <div className={styles.performanceWrapper}>
                <div className={styles.perfIndicator}>
                  <div className={styles.iconWrapper}></div>
                  <div className={styles.data}>
                    <p className={cx(styles.dataFigure)}>
                      {performanceData.totalActiveLinks ?? 0}
                    </p>
                    <h5 className={styles.dataName}>ACTIVE LINKS</h5>
                  </div>
                </div>
              </div>
            </div>
          </Grid>

          <Grid item sm={12} md={9}>
            <div className={styles.graphWrapper}>
              <p className={styles.graphEmptyText}>
                This feature is coming soon. You will be able to see realtime
                performance analytics here.
              </p>
            </div>
          </Grid>
        </Grid>
      </div>

      <div className={styles.linksStatsWrapper}>
        {allLinksData.links && allLinksData.links.length ? (
          <Grid container justifyContent='flex-start' alignItems='stretch'>
            <Grid item sm={12} md={5} lg={4}>
              <div className={styles.linksListWrapper}></div>
            </Grid>

            <Grid item sm={12} md={7} lg={8}>
              <div className={styles.selectedLinkStatsWrapper}></div>
            </Grid>
          </Grid>
        ) : (
          <div className={styles.linksEmptyWrapper}>
            <p className={styles.linksEmptyText}>
              You have not created any shortened links yet
            </p>
            <Button
              variant='contained'
              color='primary'
              onClick={() => handleCreateLink()}
            >
              Create Short Link
            </Button>
          </div>
        )}
      </div>

      <CreateShortLink
        open={isCreateLinkModalOpen}
        onClose={() => setIsCreateLinkModalOpen(false)}
      />
    </section>
  );
};

export default Dashboard;
