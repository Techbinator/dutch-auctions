import React from "react";
import "./Button.scss";
interface IButton {
  type: "primary" | "secondary";
  text: string;
}

export default ({ type, text }: IButton) => (
  <button className={type}>{text}</button>
);
