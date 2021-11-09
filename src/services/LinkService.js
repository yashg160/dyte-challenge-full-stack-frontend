import axiosIntance from './CreateService';
import APIConstants from '../common/APIConstants';

export const createNewShortLink = (dataPayload) => {
  return axiosIntance.post(APIConstants.CREATE_LINK, dataPayload);
};

export const updateShortLink = (dataPayload) => {
  const API_URL = APIConstants.UPDATE_LINK.replace(
    '{{identifier}}',
    dataPayload.id
  );
  return axiosIntance.put(API_URL, dataPayload);
};
