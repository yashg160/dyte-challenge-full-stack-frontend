import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router';

import AuthContext from '../../context/AuthContext';

import axiosInstance from '../../services/CreateService';
import { fetchUserData } from '../../services/AuthService';

const AuthGuard = (props) => {
  const history = useHistory();

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('TOKEN');

    if (token !== null) {
      // Set Bearer Token in Instance Header
      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${token}`;

      fetchUserData()
        .then((responseData) => {
          setUserData(responseData.data);

          setIsLoading(false);
          setIsAuthenticated(true);
        })
        .catch((errorData) => {
          localStorage.clear();

          history.replace('/');
        });
    } else {
      setIsLoading(false);
      history.replace('/signin');
    }
  }, []);

  if (!isLoading && isAuthenticated && userData) {
    return (
      <AuthContext.Provider value={{ userData: userData }}>
        {props.children}
      </AuthContext.Provider>
    );
  } else {
    return <></>;
  }
};

export default AuthGuard;
