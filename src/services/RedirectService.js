import axiosIntance from './CreateService';
import APIConstants from '../common/APIConstants';

export const fetchRedirectionData = (dataPayload) => {
  const API_URL = `${APIConstants.REDIRECT}?slug=${dataPayload.slug}`;
  return axiosIntance.get(API_URL);
};
