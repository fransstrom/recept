import React, { Component } from "react";

export default class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const blackLink = {
    //   color: "black"
    // };

    return (
      <footer className={this.props.className}>
        <div className="container">
          <div className="row">
            <div className="col-sm-4" />
            <div className="col-sm-4 footer-icons">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/fransstrom"
                className="icon_link">
                <i className="fab fa-github" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/frans-herrstr%C3%B6m-670a98177/"
                className="icon_link">
                <i className="fab fa-linkedin-in" />
              </a>
              <a href="mailto:frans.herrstrom@gmail.com" className="icon_link">
                <i className="fas fa-envelope" />
              </a>
            </div>
            <div className="col-sm-4" />
            {/* <div className="col-sm-12 footer-copyr">
              Copyright © 2018 Frans Herrström
            </div> */}
          </div>
        </div>
      </footer>
    );
  }
}
