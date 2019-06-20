import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: ""
    };
  }

//   validateForm() {
//     return this.state.email.length > 0 && this.state.password.length > 0;
//   }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.checkLogin(this.state.login, this.state.password)
  }

  render() {
    return (
      <div>
          <div className="background"></div>    
          <div className="Login">
            <form onSubmit={this.handleSubmit}>
              <FormGroup controlId="login" bsSize="large">
                <ControlLabel>Login</ControlLabel>
                <FormControl
                  autoFocus
                  type="login"
                  value={this.state.login}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="password" bsSize="large">
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                />
              </FormGroup>
              <Button
                block
                bsSize="large"
                type="submit"
              >
                Login
              </Button>
            </form>
          </div>
      </div>
    );
  }
}

export default Login;