import React, { Component } from "react";
import { Link } from "react-router-dom";

class NoMatch extends Component {
  render(){
    return (
      <div style={{ height: "80vh", marginTop: '70px' }} className="container center-align" >
        <h1 style={{ fontSize: '10rem', fontWeight: 'bold' }}>OOOPS!</h1>
        <h4>404-PAGE NOT FOUND</h4>
        <p>The page your looking for might have been removed <br/> or changed or might have been deleted</p>
        <br/>
        <Link className="btn btn-large waves-effect hoverable blue accent-3" to="/">GO TO HOMEPAGE</Link>
      </div>
    )
  }
}

export default NoMatch;
