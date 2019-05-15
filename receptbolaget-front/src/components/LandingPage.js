import React, { Component } from "react";
import { getBrowserDetails, getLanguage } from "../actions/browsers";
import squidward from "../images/squidward.gif";
import Footer from "./Footer";

export default class LandingPage extends Component {
  constructor() {
    super();
    var browser = getBrowserDetails();
    var language = getLanguage().split("-")[1];
    this.state = {
      browser: browser,
      language: language,
      user: { isSignedIn: null, userName: null }
    };
    console.log(navigator);
  }

  render() {
    return (
      <div>
        <div id="landing_container" className="bold">
          {/* <h1>Sooooo wet!</h1> */}
          {/*  <h4>{this.state.browser}</h4>
        <p>{this.state.language}</p> */}
          <img className="squidward" src={squidward} alt="Squid" />
          <div
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              zIndex: "-1",
              backgroundImage:
                "linear-gradient(0deg, rgba(36,52,138,1) 0%, rgba(28,113,148,0.7847514005602241) 35%, rgba(255,136,0,0.6699054621848739) 100%)"
            }}
          />
        </div>
        <Footer className="start_page_footer" />
      </div>
    );
  }
}
