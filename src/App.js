import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Link } from "react-router-dom";
import _ from "lodash";
import { urls } from "./config";
import { connect } from "react-redux";
import { SAVE_USER } from "./reducers/loginReducer";

import routes from "./route/index";
import { PublicRoute, PrivateRoute } from "./RouteManagement";

class App extends React.Component {
  componentDidMount() {
    let user_info = JSON.parse(localStorage.getItem("user_info"));
    if (user_info) {
      let firstname = user_info.firstname;
      let lastname = user_info.lastname;
      let email = user_info.email;
      let image = user_info.image;
      this.props.saveUser(firstname, lastname, email, image);
    }
  }
  render() {
    return (
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={urls.home}>
                FRONT-END TEST
              </Link>
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo02"
              >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={urls.signIn}>
                      Sign In
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={urls.signUp}>
                      Sign Up
                    </Link>
                  </li>
                  <li className="nav-item"></li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="auth-wrapper">
            {/* <div className="auth-inner"> */}
            <Switch>
              {_.map(routes, (route, idx) => {
                return route.isProtected ? (
                  <PrivateRoute key={idx} {...route} />
                ) : (
                  <PublicRoute key={idx} {...route} />
                );
              })}
            </Switch>
            {/* </div> */}
          </div>
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveUser: (firstname, lastname, email, image) =>
      dispatch({
        type: SAVE_USER,
        payload: { firstname, lastname, email, image },
      }),
  };
};

export default connect(null, mapDispatchToProps)(App);
