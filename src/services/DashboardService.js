import axiosIntance from './CreateService';
import APIConstants from '../common/APIConstants';

export const fetchDashboardAnalytics = () => {
  return axiosIntance.get(APIConstants.DASHBOARD_ANALYTICS_DATA);
};

export const fetchUserLinks = () => {
  return axiosIntance.get(APIConstants.DASHBORD_LINKS);
};

export const fetchLinkData = (dataPayload) => {
  const API_URL = APIConstants.LINK_DATA.replace(
    '{{identifier}}',
    dataPayload.id
  );
  return axiosIntance.get(API_URL);
};
