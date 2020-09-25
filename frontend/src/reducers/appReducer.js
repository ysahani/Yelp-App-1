const createState = {
  isSignedUp: null,
  isLoggedIn: null,
  name: '',
  location: '',
  email: '',
  description: '',
  timings: '',
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
      name: action.rname,
      location: action.location,
      email: action.email,
      isSignedUp: true,
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
      isSignedUp: null,
      isLoggedIn: null,
    };
  }
  if (action.type === 'UPDATE_PROFILE') {
    return {
      ...state,
      email: action.email,
      name: action.rname,
      location: action.location,
      description: action.description,
      timings: action.timings,
    };
  }
  return state;
};

export default appReducer;
