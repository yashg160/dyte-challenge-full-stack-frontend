import APIConstants from '../common/APIConstants';
import axiosIntance, { axiosAuthInstance } from './CreateService';

export const fetchUserData = () => {
  return axiosIntance.get(APIConstants.USER_DATA);
};

export const userSignIn = (dataPayload) => {
  return axiosAuthInstance.post(APIConstants.USER_SIGN_IN, dataPayload);
};

export const userSignUp = (dataPayload) => {
  return axiosAuthInstance.post(APIConstants.USER_SIGN_UP, dataPayload);
};
