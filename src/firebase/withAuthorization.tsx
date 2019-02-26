import * as React from "react";
import { withRouter } from "react-router-dom";
import { firebase } from "./";
import Loading from "../components/Loading";
import { AuthUserContext } from "./AuthUserContext";

//verify if user is loged in or not
export const withAuthorization = (checkIsLogedin: boolean) => (
  Component: any
) => {
  class WithAuthorization extends React.Component<any, {}> {
    state = {
      loading: true
    };
    _isMounted: boolean = false;
    public componentDidMount() {
      this._isMounted = true;
      const { history } = this.props;
      firebase.auth.onAuthStateChanged(authUser => {
        if (checkIsLogedin && !authUser) {
          history.push("/login");
        } else if (!checkIsLogedin && authUser) {
          history.push("/my_auctions");
        }
        if (this._isMounted) {
          this.setState({ loading: false });
        }
      });
    }

    public componentWillUnmount() {
      this._isMounted = false;
    }

    public render() {
      const { loading } = this.state;
      if (loading) {
        return <Loading />;
      }

      return (
        <AuthUserContext.Consumer>
          {authUser => <Component authUser={authUser} {...this.props} />}
        </AuthUserContext.Consumer>
      );
    }
  }

  return withRouter(WithAuthorization);
};
