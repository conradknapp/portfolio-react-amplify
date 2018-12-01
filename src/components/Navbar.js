import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar, Nav, BSpan } from "bootstrap-4-react";

const HomeItems = props => (
  <React.Fragment>
    <Nav.ItemLink href="/" active>
      Home
      <BSpan srOnly>(current}</BSpan>
    </Nav.ItemLink>
    <Nav.ItemLink href="/login">Login</Nav.ItemLink>
  </React.Fragment>
);

const LoginItems = props => (
  <React.Fragment>
    <Nav.ItemLink href="/">Home</Nav.ItemLink>
    <Nav.ItemLink href="/login" active>
      Login
      <BSpan srOnly>(current}</BSpan>
    </Nav.ItemLink>
  </React.Fragment>
);

export default class Navigation extends Component {
  render() {
    return (
      <Navbar expand="md" dark bg="dark" fixed="top">
        <Navbar.Brand href="/">Test</Navbar.Brand>
        <Navbar.Toggler target="#navbarsExampleDefault" />

        <Navbar.Collapse id="navbarsExampleDefault">
          <Navbar.Nav mr="auto">
            <Router>
              <Switch>
                <Route exact path="/" component={HomeItems} />
                <Route path="/login" component={LoginItems} />
              </Switch>
            </Router>
          </Navbar.Nav>
          <Navbar.Text>Hello</Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
