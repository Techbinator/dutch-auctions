import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuctionsList from "./pages/AuctionsList";
import MyAuctionsList from "./pages/MyAuctionsList";
import Auction from "./pages/Auction";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MainContainer isLogedIn={true}>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/auctions" component={AuctionsList} />
          <Route exact path="/my_auctions" component={MyAuctionsList} />
          <Route exact path="/auction" component={Auction} />
        </MainContainer>
      </BrowserRouter>
    );
  }
}

export default App;
