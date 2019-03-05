import React, { Component } from "react";
import { getBrowserDetails, getLanguage } from "../actions/browsers";
import squidward from "../images/squidward.gif";
export default class LandingPage extends Component {
  constructor() {
    super();
    var browser = getBrowserDetails();
    var language = getLanguage().split("-")[1];
    this.state = {
      browser: browser,
      language: language
    };
    console.log(navigator);
  }

  componentWillMount() {}

  render() {
    return (
      <div id="landing_container">
        {/* <h1>Frans Herrström</h1>
        <h4>{this.state.browser}</h4>
        <p>{this.state.language}</p> */}
        <img className="squidward" src={squidward} />
      </div>
    );
  }
}
