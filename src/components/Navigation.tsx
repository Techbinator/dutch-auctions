import React, { MouseEvent } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faUserCircle,
  faListAlt,
  faSignInAlt,
  faRegistered
} from "@fortawesome/free-solid-svg-icons";

import "./Navigation.scss";

interface INavigation {
  showMenu: boolean;
  isLogedIn?: boolean;
  onLogOutClick: (event: React.MouseEvent<HTMLElement>) => void;
}
export default ({ showMenu, onLogOutClick, isLogedIn }: INavigation) => {
  if (isLogedIn) {
    return (
      <nav className={showMenu ? "active" : "inactive"}>
        <NavLink exact to="/auctions">
          <FontAwesomeIcon icon={faListAlt} />
          Auctions
        </NavLink>
        <NavLink exact to="/my_auctions">
          <FontAwesomeIcon icon={faUserCircle} />
          My auctions
        </NavLink>
        <a href="#" onClick={onLogOutClick}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          Log out
        </a>
      </nav>
    );
  }
  return (
    <nav className={showMenu ? "active" : ""}>
      <NavLink exact to="/login">
        <FontAwesomeIcon icon={faSignInAlt} />
        Log In
      </NavLink>
      <NavLink exact to="/register">
        <FontAwesomeIcon icon={faRegistered} />
        Register
      </NavLink>
    </nav>
  );
};
