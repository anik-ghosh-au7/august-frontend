import React, { Component } from "react";
import { httpRequest } from "../config";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
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
    console.log("change handler triggered");
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => {
        console.log(this.state);
      }
    );
  };

  clickedSubmitButton = async (e) => {
    e.preventDefault();
    console.log("submit button clicked");
    const formData = this.state;
    console.log("form data --> ", formData);
    const { history } = this.props;
    try {
      let res_data = await httpRequest({
        method: "POST",
        url: "https://august-frontend.herokuapp.com/signup",
        data: formData,
      });
      console.log("response data --> ", res_data.data.msg);
      history.push("/sign-in");
    } catch (error) {
      console.log("signup error --> ", error);
      this.setState({ error: "error occured !!!" });
    }
  };

  render() {
    const { firstname, lastname, email, password, error } = this.state;
    return (
      <div className="auth-inner">
        <form>
          <h3>Sign Up</h3>
          {error && <h6 id="error">{error}</h6>}
          <div className="form-group">
            <label>First name</label>
            <input
              name="firstname"
              type="text"
              className="form-control"
              value={firstname}
              onChange={this.inputChangeHandler}
              placeholder="First name"
              ref={this.inputRef}
            />
          </div>

          <div className="form-group">
            <label>Last name</label>
            <input
              name="lastname"
              type="text"
              className="form-control"
              value={lastname}
              onChange={this.inputChangeHandler}
              placeholder="Last name"
            />
          </div>

          <div className="form-group">
            <label>Email address</label>
            <input
              name="email"
              type="email"
              className="form-control"
              value={email}
              onChange={this.inputChangeHandler}
              placeholder="Enter email"
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

          <button
            type="submit"
            className="btn btn-primary btn-block"
            onClick={this.clickedSubmitButton}
          >
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}
