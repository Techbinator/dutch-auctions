import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faUserCircle,
  faListAlt
} from "@fortawesome/free-solid-svg-icons";

interface INavigation {
  showMenu: boolean;
}
export default ({ showMenu }: INavigation) => (
  <nav className={showMenu ? "active" : ""}>
    <NavLink exact to="/auctions">
      <FontAwesomeIcon icon={faListAlt} />
      Auctions
    </NavLink>
    <NavLink exact to="/my_auctions">
      <FontAwesomeIcon icon={faUserCircle} />
      My auctions
    </NavLink>
    <NavLink exact to="/logout">
      <FontAwesomeIcon icon={faSignOutAlt} />
      Log out
    </NavLink>
  </nav>
);
