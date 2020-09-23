const createState = {
  isSignedUp: null,
};
const appReducer = (state = createState, action) => {
  if (action.type === 'SIGNUP_USER') {
    return {
      isSignedUp: true,
    };
  }
  if (action.type === 'DONT_SIGNUP_USER') {
    return {
      isSignedUp: false,
    };
  }
  return state;
};

export default appReducer;
