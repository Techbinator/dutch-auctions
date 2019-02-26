import * as React from "react";
import { firebase } from "./";
import { AuthUserContext } from "./AuthUserContext";
import { User } from "firebase";

interface InterfaceState {
  authUser?: User | null;
}

export const withAuthentication = (Component: any) => {
  class WithAuthentication extends React.Component<{}, InterfaceState> {
    state = {
      authUser: null
    };

    public componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState(() => ({ authUser }))
          : this.setState(() => ({ authUser: null }));
      });
    }

    public render() {
      const { authUser } = this.state;

      return (
        <AuthUserContext.Provider value={authUser}>
          <Component authUser={authUser} />
        </AuthUserContext.Provider>
      );
    }
  }
  return WithAuthentication;
};
