import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['isSignedUp', 'isLoggedIn', 'email', 'name', 'location', 'description', 'timings']
};
const createState = {

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
  if (action.type === 'LOGIN_CUSTOMER') {
    return {
      ...state,
      name: action.cname,
      email: action.email,
      yelpingSince: action.yelpSince,
      thingsILove: action.love,
      findMeIn: action.findMe,
      blogsite: action.weblog,
      dob: action.dateob,
      city: action.acity,
      state: action.astate,
      country: action.acountry,
      nickname: action.nname,
      phone: action.aphone,
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
  if (action.type === 'UPDATE_CUSTOMER') {
    return {
      ...state,
      name: action.fullname,
      email: action.email,
      yelpingSince: action.yelpSince,
      thingsILove: action.love,
      findMeIn: action.findIn,
      blogsite: action.weblog,
      dob: action.dob,
      city: action.acity,
      state: action.astate,
      country: action.acountry,
      nickname: action.nname,
      phone: action.aPhone,
      isSignedUp: true,
      isLoggedIn: true,
    };
  }
  return state;
};

export default persistReducer(persistConfig, appReducer);
