import React, { ReactNode } from "react";
import "./MainContainer.scss";
import Header from "../components/Header";
interface IMainContainer {
  isLogedIn: boolean;
  children: ReactNode;
}

export default ({ isLogedIn, children }: IMainContainer) => {
  return (
    <>
      <Header isLogedIn={isLogedIn} />
      <div
        className={`box-shadow ${isLogedIn ? "container" : "auth-container"}`}
      >
        {children}
      </div>
    </>
  );
};
