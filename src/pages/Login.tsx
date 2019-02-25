import React from "react";
import Button from "../components/Button";

export default () => (
  <form>
    <input type="text" placeholder="username" />
    <input type="password" placeholder="password" />
    <Button type="primary" text="LOGIN" />
    <p>
      Not registered? <a href="#">Create an account</a>
    </p>
  </form>
);
