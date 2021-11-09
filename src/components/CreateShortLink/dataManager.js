export const validateData = (state) => {
  let errorsArr = [];

  if (state && Object.keys(state).length !== 0) {
    if (state.sourceURL === null || state.sourceURL === '') {
      errorsArr.push('Long URL cannot be empty');
    }

    if (
      !/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(
        state.sourceURL
      )
    ) {
      errorsArr.push('Long URL should be of a valid format');
    }
  }

  return errorsArr;
};
