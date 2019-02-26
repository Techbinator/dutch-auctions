import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { withAuthentication } from "./firebase/withAuthentication";

import MainContainer from "./components/MainContainer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuctionsList from "./pages/AuctionsList";
import MyAuctionsList from "./pages/MyAuctionsList";
import Auction from "./pages/Auction";
import { User } from "firebase";

class App extends React.Component<{ authUser: User }> {
  render() {
    const { authUser } = this.props;
    return (
      <BrowserRouter>
        <MainContainer isLogedIn={authUser ? true : false}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/auctions" component={AuctionsList} />
            <Route exact path="/my_auctions" component={MyAuctionsList} />
            <Route exact path="/auction" component={Auction} />
          </Switch>
        </MainContainer>
      </BrowserRouter>
    );
  }
}

export default withAuthentication(App);
