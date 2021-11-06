import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

import { Button } from '@material-ui/core';
import InsertLinkSharpIcon from '@material-ui/icons/InsertLinkSharp';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';

import cx from 'classnames';
import styles from './Navbar.module.scss';

const MainNavbar = (props) => {
  const authData = useContext(AuthContext);

  return (
    <nav className={styles.navWrapper}>
      <div className={styles.navInnerWrapper}>
        <div className={styles.leftContent}>
          <a href='/'>
            <InsertLinkSharpIcon htmlColor='white' fontSize='large' />
          </a>
        </div>

        <div className={styles.rightContent}>
          {props.primaryActionButtonClick && props.primaryActionButtonText && (
            <Button
              size='small'
              color='secondary'
              variant='contained'
              onClick={() => props.primaryActionButtonClick()}
            >
              {props.primaryActionButtonText}
            </Button>
          )}

          {props.primaryActionButtonClick && props.primaryActionButtonText && (
            <div className={styles.verticalDivider}></div>
          )}

          {authData && authData.userData && (
            <div className={styles.userDetailsWrapper}>
              <div className={styles.iconWrapper}>
                <PersonOutlineOutlinedIcon />
              </div>

              <div className={styles.detailsWrapper}>
                <p className={styles.name}>{authData.userData.name}</p>
                <p className={styles.accountType}>Free Account</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
