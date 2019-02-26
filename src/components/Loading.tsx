import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./Loading.scss";

export default () => (
  <div className="loading-container">
    <FontAwesomeIcon icon={faSpinner} spin size="10x" />
  </div>
);
