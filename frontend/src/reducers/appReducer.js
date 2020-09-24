const createState = {
  isSignedUp: null,
  isLoggedIn: null,
};
const appReducer = (state = createState, action) => {
  if (action.type === 'SIGNUP_USER') {
    return {
      ...state,
      isSignedUp: true,
    };
  }
  if (action.type === 'DONT_SIGNUP_USER') {
    return {
      ...state,
      isSignedUp: false,
    };
  }
  if (action.type === 'LOGIN_USER') {
    return {
      ...state,
      isLoggedIn: true,
    };
  }
  if (action.type === 'DONT_LOGIN_USER') {
    return {
      ...state,
      isLoggedIn: false,
    };
  }
  if (action.type === 'SIGN_OUT') {
    return {
      ...state,
      isLoggedIn: null,
    };
  }
  return state;
};

export default appReducer;
