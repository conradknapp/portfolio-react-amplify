import React, { Component } from "react";
import Main from "./components/Main";
import Navbar from "./components/Navbar";

import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Main />
      </>
    );
  }
}

export default App;
