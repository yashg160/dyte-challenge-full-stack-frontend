import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import dayjs from 'dayjs';

import {
  fetchDashboardAnalytics,
  fetchUserLinks,
} from '../../services/DashboardService';

import { Grid, Button } from '@material-ui/core';
import MainNavbar from '../../components/MainNavbar';

import cx from 'classnames';
import styles from './Dashboard.module.scss';
import CreateShortLink from '../../components/CreateShortLink';
import EditShortLink from '../../components/EditShortLink';
import { getProperShortLink } from '../../common/helper';

const Dashboard = (props) => {
  const authData = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [allLinksData, setAllLinksData] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);
  const [editingLinkData, setEditingLinkData] = useState(null);
  const [selectedLinkData, setSelectedLinkData] = useState(null);
  const [isEditLinkModalOpen, setIsEditLinkModalOpen] = useState(false);
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
        console.log('Error While Fetching Data', errorData);
      });
  };

  const handleCreateLink = () => {
    setIsCreateLinkModalOpen(true);
  };

  const handleEditLink = (linkData) => {
    setEditingLinkData(linkData);
    setIsEditLinkModalOpen(true);
  };

  const handleCreateComplete = (linkData) => {
    setIsCreateLinkModalOpen(false);

    setEditingLinkData(linkData);
    setIsEditLinkModalOpen(true);
  };

  const handleEditComplete = () => {
    setEditingLinkData(null);
    setIsEditLinkModalOpen(false);

    // Refresh Data from API
    fetchUserLinks()
      .then((responseData) => {
        setAllLinksData(responseData.data);
      })
      .catch((errorData) => {
        console.log('Error Fetching User Links Data', errorData);
      });
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
              <div className={styles.headerWrapper}>
                <h4 className={styles.mainHeading}>All Active Links</h4>
                <label className={styles.description}>
                  {allLinksData.links.length} Items
                </label>
              </div>

              <div className={styles.linksListWrapper}>
                {allLinksData.links.map((currentLink, currentIndex) => (
                  <button
                    className={cx(styles.linkWrapper, {
                      [styles.selectedLinkWrapper]:
                        selectedLinkData &&
                        selectedLinkData.id === currentLink.id,
                    })}
                    onClick={() => setSelectedLinkData(currentLink)}
                  >
                    <span className={styles.date}>
                      {dayjs(currentLink.created_at).format('MMM DD')}
                    </span>
                    <p className={styles.source}>{currentLink.source}</p>
                    <a
                      target='_blank'
                      rel='noreferrer'
                      href={getProperShortLink(currentLink.slug)}
                      className={styles.shortLink}
                    >
                      {process.env.REACT_APP_SHORT_LINK_DOMAIN}/
                      <b>{currentLink.slug}</b>
                    </a>
                  </button>
                ))}
              </div>
            </Grid>

            {selectedLinkData && (
              <Grid item sm={12} md={7} lg={8}>
                <div className={styles.selectedLinkStatsWrapper}>
                  <p className={styles.date}>
                    Created{' '}
                    {dayjs(selectedLinkData.created_at).format(
                      'MMMM DD YYYY, hh:mm A'
                    )}{' '}
                    | You
                  </p>

                  <p className={styles.source}>
                    <a
                      target='_blank'
                      rel='noreferrer'
                      href={selectedLinkData.source}
                    >
                      {selectedLinkData.source}
                    </a>
                  </p>

                  <div className={styles.actionsWrapper}>
                    <a
                      target='_blank'
                      rel='noreferrer'
                      className={styles.shortLink}
                      href={getProperShortLink(selectedLinkData.slug)}
                    >
                      {process.env.REACT_APP_SHORT_LINK_DOMAIN}/
                      <b>{selectedLinkData.slug}</b>
                    </a>

                    {/*    <Button size='small' color='secondary' variant='outlined'>
                      COPY
                    </Button> */}

                    <Button
                      size='small'
                      color='secondary'
                      variant='outlined'
                      onClick={() => handleEditLink(selectedLinkData)}
                    >
                      EDIT
                    </Button>
                  </div>
                  <div className={styles.divider}></div>

                  <h5 className={styles.totalClicksCount}>
                    {selectedLinkData.clicks ?? 0}
                  </h5>
                  <span className={styles.dataName}>Total Clicks</span>
                </div>
              </Grid>
            )}
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
        onCreateComplete={(linkData) => handleCreateComplete(linkData)}
      />

      <EditShortLink
        open={isEditLinkModalOpen}
        linkData={editingLinkData}
        onClose={() => setIsEditLinkModalOpen(false)}
        onEditComplete={() => handleEditComplete()}
      />
    </section>
  );
};

export default Dashboard;
