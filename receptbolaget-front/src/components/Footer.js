import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    // const blackLink = {
    //   color: "black"
    // };

    return (
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-sm-4" />
            <div className="col-sm-4 footer-icons">
              <a href="www.google.com" className="icon_link">
                <i className="fab fa-github" />
              </a>
              <a href="www.google.com" className="icon_link">
                <i className="fab fa-linkedin-in" />
              </a>
              <a href="www.google.com" className="icon_link">
                <i className="fas fa-envelope" />
              </a>
            </div>
            <div className="col-sm-4" />
            <div className="col-sm-12 footer-copyr">
              Copyright © 2018 Frans Herrström
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
