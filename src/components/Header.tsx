import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { withRouter, RouteComponentProps } from "react-router";
import { auth } from "../firebase";
import Navigation from "./Navigation";
import "./Header.scss";

interface IRegisterProps {
  isLogedIn?: boolean;
}
interface IHeaderState {
  showMenu: boolean;
}

class Header extends React.Component<
  RouteComponentProps & IRegisterProps,
  IHeaderState
> {
  state = {
    showMenu: false
  };
  onLogOutClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    auth
      .signOut()
      .then(() => {
        this.props.history.push("/login");
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  };

  render() {
    const { isLogedIn } = this.props;
    const { showMenu } = this.state;
    return (
      <header className="header">
        <div className="logo">
          dutch<span>.auction</span>
        </div>
        <div
          className="navbar-toggle"
          onClick={() => this.setState({ showMenu: !showMenu })}
        >
          <FontAwesomeIcon icon={faBars} />
        </div>

        <Navigation
          isLogedIn={isLogedIn}
          onLogOutClick={this.onLogOutClick}
          showMenu={showMenu}
        />
      </header>
    );
  }
}

export default withRouter(Header);
