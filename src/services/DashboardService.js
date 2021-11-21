import axiosIntance from './CreateService';
import APIConstants from '../common/APIConstants';

export const fetchDashboardAnalytics = () => {
  return axiosIntance.get(APIConstants.DASHBOARD_ANALYTICS_DATA);
};

export const fetchUserLinks = () => {
  return axiosIntance.get(APIConstants.DASHBORD_LINKS);
};
