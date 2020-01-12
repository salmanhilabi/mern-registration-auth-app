import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updatePassword } from "../../../actions/authActions";

class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      currentPassword: "",
      newPassword: "",
      newPassword2: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  static getDerivedStateFromProps(props, state){
     if(props.errors !== state.errors){
       return { errors: props.errors};
    }
    else return null;
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newPassword = {
      currentPassword: this.state.currentPassword,
      newPassword: this.state.newPassword,
      newPassword2: this.state.newPassword2
    };
    this.props.updatePassword(newPassword, this.props.auth.user.id, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/dashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              Dashboard
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Change Password</b> below
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.currentPassword}
                  id="currentPassword"
                  type="Password"
                />
              <label htmlFor="currentPassword">Current Password</label>
                <span className="red-text">{errors.currentPassword}{errors.passwordmismatch}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.newPassword}
                  id="newPassword"
                  type="password"
                />
              <label htmlFor="newPassword">New Password</label>
                <span className="red-text">{errors.newPassword}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.newPassword2}
                  id="newPassword2"
                  type="password"
                />
              <label htmlFor="newPassword2">Confirm New Password</label>
                <span className="red-text">{errors.newPassword2}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

// checking & always provid specified data type for error prevention
ChangePassword.propTypes = {
  updatePassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{ updatePassword })(ChangePassword);
