import React from "react";
import "./Filter.scss";

export default () => (
  <div className="filter">
    <label>Status</label>
    <select id="status-filter" name="filter">
      <option value="all">All</option>
      <option value="active">Active</option>
      <option value="ended">Ended</option>
    </select>
  </div>
);
