import React, {Component} from 'react';
import {SERVER_URL} from './../utils/constants'

const Page404 = () => {
    return(
      <div className="container">
          <div className="row">
              <div className="col-sm-push-4 col-sm-4">
                  <div className="error-template">
                      <h1>
                          Oops!</h1>
                      <h2>
                          404 Not Found</h2>
                      <div className="error-details">
                          Lo sentimos la pagina que requiere no existe
                      </div>
                      <div className="error-actions">
                          <a href={SERVER_URL} className="btn btn-primary btn-lg">
                            <span className="glyphicon glyphicon-home"></span>
                              Take Me Home
                          </a>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
}

export default Page404;
