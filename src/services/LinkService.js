import axiosIntance from './CreateService';
import APIConstants from '../common/APIConstants';

export const createNewShortLink = (dataPayload) => {
  return axiosIntance.post(APIConstants.CREATE_LINK, dataPayload);
};
