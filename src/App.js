import React, { Component } from 'react';
import Header from './Components/Header/Header';
import MainContainer from './Components/MainContainer/MainContainer';
import TokenService from './services/token-service';
import Burger from './Components/Burger/Burger';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: TokenService.hasAuthToken(),
      error: null
    }
  }

  render() {


    return (
        <div>
          
          <Header />

          <Burger pageWrapId={"page-wrap"} outerContainerId={"App"} />

          <MainContainer />

        </div>
    )
  }
}