import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header isLogedIn={true} />
      </BrowserRouter>
    );
  }
}

export default App;
