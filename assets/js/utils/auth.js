// cb == callback
export const auth = {
  login(credentials, cb) {
    cb = arguments[arguments.length - 1]

    /*
    $.ajax({
      method: 'POST',
      url: `${SERVER_URL}/comercial_agent/notifications/${notificationId}`,
      data: JSON.stringify(notificationObj),
    })
    .done(( msg ) => {
      auth.login()
    })
    .fail((err) => {
      console.error(err);
    })
    */
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
  },

  getToken() {
    return localStorage.token
  },

  logout(cb) {
    delete localStorage.token
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn() {
    return !!localStorage.token
  },

  onChange() {}
}

function notAuthorize(nextState,replace){
  replace({
    pathname: '/login',
    state: { nextPathname: nextState.location.pathname }
  })
}
// #ToDo delete below function, is just for dev proposes
function pretendRequest(email, pass, cb) {
  setTimeout(() => {
    if (email === 'admin@example.com' && pass === '12345678') {
      cb({
        role: "admin",
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      })
    }else if (email === 'artist@example.com' && pass === '12345678') {
      cb({
        id: 1,
        role: "artist",
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      })
    } else {
      cb({ authenticated: false })
    }
  }, 0)
}

export const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    notAuthorize(nextState,replace);
  }
}

export const role = (nextState, replace) => {notAuthorize
  return {
    artist: () => {
      if (!auth.artist()){
        notAuthorize();
      }
    },
    comercialAgent: () => {
      if (!auth.comercialAgent()) {
        notAuthorize();
      }
    },
  }
}
