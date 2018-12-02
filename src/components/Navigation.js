import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar, Nav, BSpan } from "bootstrap-4-react";
import { Auth, Hub } from "aws-amplify";
import SignOut from "./SignOut";

const HomeItems = () => (
  <>
    <Nav.ItemLink href="/" active>
      Home
      <BSpan srOnly>(current}</BSpan>
    </Nav.ItemLink>
    <Nav.ItemLink href="/login">Login</Nav.ItemLink>
  </>
);

const LoginItems = () => (
  <>
    <Nav.ItemLink href="/">Home</Nav.ItemLink>
    <Nav.ItemLink href="/login" active>
      Login
      <BSpan srOnly>(current}</BSpan>
    </Nav.ItemLink>
  </>
);

const ProfileItems = props => (
  <>
    <Nav.ItemLink href="/">Home</Nav.ItemLink>
    <Nav.ItemLink href="/profile" active>
      Profile
    </Nav.ItemLink>
    <Nav.ItemLink href="/login">
      Login
      <BSpan srOnly>(current}</BSpan>
    </Nav.ItemLink>
  </>
);

export default class Navigation extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    this.loadUser();
    Hub.listen("auth", this, this.onHubCapsule);
  }

  loadUser = () => {
    Auth.currentAuthenticatedUser()
      .then(user => this.setState({ user }))
      .catch(err => this.setState({ user: null }));
  };

  onHubCapsule = capsule => {
    this.loadUser(); // Triggered every time user sign in / out
    console.log({ capsule });
  };

  render() {
    const { user } = this.state;
    console.log(this.props.profile);

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
                <Route path="/profile" component={ProfileItems} />
              </Switch>
            </Router>
          </Navbar.Nav>
          <Navbar.Text mr="2">
            {user ? `Hi ${user.username}` : "Please sign in"}
          </Navbar.Text>
          {user && <SignOut />}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
