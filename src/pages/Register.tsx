import React from "react";
import Button from "../components/Button";

export default () => (
  <form>
    <input type="text" placeholder="name" />
    <input type="password" placeholder="password" />
    <input type="text" placeholder="email address" />
    <Button type="primary" text="REGISTER" />
    <p>
      Already registered? <a href="#">Sign In</a>
    </p>
  </form>
);
