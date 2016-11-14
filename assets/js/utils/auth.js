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
  getUserRole(){
    return localStorage.role
  },
  login(credentials, cb) {
    cb = arguments[arguments.length - 1]
    $.ajax({
      method: 'POST',
      url: `${SERVER_URL}/comercial_agent/auth/login/`,
      data: JSON.stringify(credentials),
    })
    .done(( {user} ) => {
      localStorage.token = user.token
      localStorage.userId = user.id
      localStorage.role = user.role
      if (cb) cb(true,user)
      this.onChange(true)
    })
    .fail((err) => {
      if (cb) cb(false)
      this.onChange(false)
    })
    /*
    pretendRequest(credentials.username, credentials.password, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        localStorage.role = res.role
        if (cb) cb(true,res)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })
    */
  },

  logout(cb) {
    delete localStorage.token
    delete localStorage.role
    delete localStorage.userId
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
