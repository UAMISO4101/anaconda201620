// cb == callback
import {SERVER_URL} from './constants';

export const auth = {
  artist(){
    return getRole("artist");
  },
  comercial_agent(){
    return getRole("commercial-agent");
  },
  onChange() {},
  getToken() {
    return localStorage.token
  },
  getUserInformation() {
    return {
      id: localStorage.userId,
      email: localStorage.email,
      image: localStorage.userImage,
      role: localStorage.role,
      username: localStorage.username,
    }
  },

  login(credentials, cb) {
    cb = arguments[arguments.length - 1]
    $.ajax({
      method: 'POST',
      url: `${SERVER_URL}/comercial_agent/auth/login/`,
      data: JSON.stringify(credentials),
    })
    .done(( {user} ) => {
      localStorage.token = user.token;
      localStorage.userId = user.id;
      localStorage.userImage = user.image;
      localStorage.role = user.role;
      localStorage.username = user.username;
      if (cb) cb(true,user)
      this.onChange(true);
    })
    .fail((err) => {
      if (cb) cb(false)
      this.onChange(false)
    })
  },

  logout(cb) {
    delete localStorage.token
    delete localStorage.userId
    delete localStorage.email
    delete localStorage.username
    delete localStorage.role
    delete localStorage.email


    if (cb) cb()
    this.onChange(false)
  },

  loggedIn() {
    return !!localStorage.token
  },

  register(credentials, cb){
    console.log(credentials);
    $.ajax({
      method: 'POST',
      url: `${SERVER_URL}/comercial_agent/auth/create-artist/`,
      data: JSON.stringify(credentials),
    })
    .done( res  => {
      cb(true);
    })
    .fail((err) => {
      console.error(err);
      cb(false,err)
    })
  }
}

function notAuthorize(nextState,replace){
  replace({
    pathname: '/',
    state: { nextPathname: nextState.location.pathname }
  })
}

function getRole(role){
  return localStorage.role == role ? true : false;
}

export const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    notAuthorize(nextState,replace);
  }
}

export const isArtist = (nextState, replace) => {
  if (!auth.artist()) {
    notAuthorize(nextState, replace);
  }
}

export const isComercialAgent = (nextState, replace) => {
  if (!auth.comercial_agent()) {
    notAuthorize(nextState, replace);
  }
}
