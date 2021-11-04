import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const Dashboard = (props) => {
  const authData = useContext(AuthContext);
  console.log('Auth Data in Dashboard', authData);

  return (
    <div>
      <h1>This is the dashboard page container</h1>
    </div>
  );
};

export default Dashboard;
