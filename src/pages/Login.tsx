import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { NavLink } from "react-router-dom";
import Button from "../components/Button";
import { withAuthorization } from "../firebase/withAuthorization";
import { auth } from "../firebase";

interface ILoginState {
  email: string;
  password: string;
  error?: string | null;
  loading: boolean;
}

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
  loading: false
};

export class Login extends React.Component<RouteComponentProps, ILoginState> {
  state = INITIAL_STATE;

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //make typescript happy
    switch (event.target.name) {
      case "email":
        this.setState({ email: event.target.value });
        break;
      case "password":
        this.setState({ password: event.target.value });
        break;
    }
  };

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push("/my_auctions");
      })
      .catch((error: Error) => {
        this.setState({ error: error.message, loading: false });
      });
  };

  render() {
    const { email, password, error, loading } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        {error && <p className="error">{error}</p>}
        <input
          value={email}
          onChange={this.onChange}
          name="email"
          type="email"
          placeholder="Email address"
        />
        <input
          value={password}
          onChange={this.onChange}
          name="password"
          type="password"
          placeholder="Password"
        />
        <Button type="primary" text={loading ? "Loading..." : "LOGIN"} />
        <p>
          Not registered?{" "}
          <NavLink exact to="/register">
            Create an account
          </NavLink>
        </p>
      </form>
    );
  }
}
export default withAuthorization(false)(withRouter(Login));
