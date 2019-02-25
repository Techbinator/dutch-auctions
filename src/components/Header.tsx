import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Navigation from "./Navigation";
import "./Header.scss";

interface IHeader {
  isLogedIn: boolean;
}

export default class Header extends React.Component<IHeader> {
  state = {
    showMenu: false
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
        {isLogedIn && <Navigation showMenu={showMenu} />}
      </header>
    );
  }
}
