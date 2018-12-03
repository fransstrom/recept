import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <footer>
          <div className="container">
          <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4 footer-icons"><i className="fab fa-github"></i><i className="fab fa-linkedin-in"></i><i className="fas fa-envelope"></i></div>
          <div className="col-sm-4"></div>
          <div className="col-sm-12 footer-copyr">Copyright © 2018 Frans Herrström</div>
          </div>
          </div>
      </footer>
    );
  }
}
