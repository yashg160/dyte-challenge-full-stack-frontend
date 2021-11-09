export const validateData = (state) => {
  let errorsArr = [];

  const { backHalf, isExpireType, expireTime } = state;
  if (state && Object.keys(state).length !== 0) {
    if (!backHalf || !backHalf instanceof String || backHalf.length < 5) {
      errorsArr.push(
        'Please enter a back-half of at least 5 characters in length'
      );
    }

    if (isExpireType) {
      if (expireTime === '' || !expireTime) {
        errorsArr.push('Please provide an expire time for this link');
      }
    }
  }

  return errorsArr;
};
