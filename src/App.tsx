import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import MainContainer from "./components/MainContainer";
import Login from "./pages/Login";
import Register from "./pages/Register";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MainContainer isLogedIn={false}>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </MainContainer>
      </BrowserRouter>
    );
  }
}

export default App;
