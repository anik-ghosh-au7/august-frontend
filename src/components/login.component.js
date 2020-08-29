import React, { Component } from "react";
import { httpRequest, urls } from "../config";
import { connect } from "react-redux";
import { SAVE_USER } from "../reducers/loginReducer";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
    };
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  inputChangeHandler = (e) => {
    // console.log('change handler triggered');
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => {
        // console.log(this.state);
      }
    );
  };

  clickedSubmitButton = async (e) => {
    e.preventDefault();
    // console.log('submit button clicked');
    const formData = this.state;
    // console.log('form data --> ', formData);
    const { history } = this.props;
    try {
      let user = await httpRequest({
        method: "POST",
        url: "https://august-frontend.herokuapp.com/login",
        data: formData,
      });
      if (user.data.error) {
        throw new Error(user.data.error);
      }
      // console.log('response data --> ', user.data);
      localStorage.setItem("access_token", user.data.access_token);
      localStorage.setItem("user_info", JSON.stringify(user.data.user));
      this.props.saveUser(
        user.data.user.firstname,
        user.data.user.lastname,
        user.data.user.email,
        user.data.user.image
      );
      history.push(urls.home);
    } catch (err) {
      console.log("login error --> ", err.message);
      this.setState({ error: err.message });
    }
  };
  render() {
    const { email, password, error } = this.state;
    return (
      <div className="auth-inner">
        <form>
          <h3>Sign In</h3>
          {error && <h6 id="error">{error}</h6>}
          <div className="form-group">
            <label>Email address</label>
            <input
              name="email"
              type="email"
              className="form-control"
              value={email}
              onChange={this.inputChangeHandler}
              placeholder="Enter email"
              ref={this.inputRef}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              value={password}
              onChange={this.inputChangeHandler}
              placeholder="Enter password"
            />
          </div>

          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            onClick={this.clickedSubmitButton}
          >
            Submit
          </button>
          <br />
        </form>
      </div>
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

export default connect(null, mapDispatchToProps)(Login);
