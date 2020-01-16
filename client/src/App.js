import React, { Component } from "react";
import { Provider } from "react-redux";
import LandingPage from "./components/layout/Landing";
import RegisterPage from "./components/layout/Register";
import LoginPage from "./components/layout/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import ProtectedRoute from "./components/protected-route/protectedRoute";
import Dashboard from "./components/protected-route/dashboard/Dashboard";
import ChangePassword from "./components/protected-route/change-password/changePassword";
import NoMatch from "./components/layout/Error";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/change-password" component={ChangePassword} />
              <ProtectedRoute exact path="/dashboard" component={Dashboard} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
