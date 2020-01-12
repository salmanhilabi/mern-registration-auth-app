import React, { Component } from "react";
import { Link } from "react-router-dom";

class LandingPage extends Component {
  render() {
    return (
      <div style={{ height: "85vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="center-align">
            <h4>
              <b>WELCOME TO MERN STACK</b><br/>JWT Login/Registeration  <br/>Web App
            </h4>
            <br />
            <div className="col s6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect hoverable blue accent-3">
                Register
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect hoverable red accent-6">
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
