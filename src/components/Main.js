import React, { Component } from "react";
import { Container } from "bootstrap-4-react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Auth, Hub, Logger } from "aws-amplify";

import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";

const logger = new Logger("Main");

export default class Main extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    this.loadUser();
    Hub.listen("auth", this, "main");
  }

  onHubCapsule(capsule) {
    logger.info("on Auth event", capsule);
    this.loadUser();
  }

  loadUser() {
    Auth.currentAuthenticatedUser()
      .then(user => this.setState({ user }))
      .catch(err => this.setState({ user: null }));
  }

  render() {
    const { user } = this.state;

    return (
      <Container as="main" role="main">
        <div className="starter-template">
          <Router>
            <Switch>
              <Route exact path="/" render={() => <Home user={user} />} />
              <Route exact path="/login" render={() => <Login user={user} />} />
              <Route
                exact
                path="/profile"
                render={() => <Profile user={user} />}
              />
            </Switch>
          </Router>
        </div>
      </Container>
    );
  }
}
