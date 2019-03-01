import React from "react";
import "./Button.scss";
interface IButton {
  type: "primary" | "secondary";
  text: string;
  disabled?: boolean;
}

export default ({ type, text, disabled = false }: IButton) => (
  <button disabled={disabled} className={type}>
    {text}
  </button>
);
