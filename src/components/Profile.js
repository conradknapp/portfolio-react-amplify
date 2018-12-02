import React, { useState, useEffect, useContext } from "react";
import { Auth, Logger } from "aws-amplify";
import { Container, Form, InputGroup, Button, Alert } from "bootstrap-4-react";
import { AppContext } from "../App";

const logger = new Logger("Profile");

export default function Profile({ user }) {
  const [profile, setProfile] = useState({
    given_name: "",
    family_name: ""
  });
  const [error, setError] = useState();
  const { dispatch } = useContext(AppContext);

  useEffect(
    () => {
      if (user) {
        loadProfile();
      }
    },
    [user]
  );

  // componentDidMount() {
  //   if (this.props.user) {
  //     this.loadProfile();
  //   }
  // }

  // componentDidUpdate(prevProps) {
  //   if (!prevProps.user && this.props.user) {
  //     loadProfile();
  //   }
  // }

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    const updatedProfile = { ...profile };
    updatedProfile[name] = value;
    setProfile({ ...updatedProfile });
  };

  const loadProfile = () => {
    Auth.userAttributes(user)
      .then(data => loadSuccess(data))
      .catch(err => handleError(err));
  };

  const saveProfile = () => {
    if (!user) {
      handleError("No user to save to");
      return;
    }

    Auth.updateUserAttributes(user, profile)
      .then(data => saveSuccess(data))
      .catch(err => handleError(err));
  };

  const loadSuccess = data => {
    logger.info("loaded user attributes", data);
    console.log(data);
    const profile = translateAttributes(data);
    setProfile({ ...profile });
  };

  const saveSuccess = data => {
    logger.info("saved user profile", data);
    dispatch({ type: "UPDATE_PROFILE", payload: profile });
  };

  const handleError = error => {
    logger.info("load / save user attributes error", error);
    setError(error.message || error);
  };

  // Auth.userAttributes returns an array of attributes.
  // We map it to an object for easy use.
  const translateAttributes = data => {
    const profile = {};
    data
      .filter(attr => ["given_name", "family_name"].includes(attr.Name))
      .forEach(attr => (profile[attr.Name] = attr.Value));
    return profile;
  };

  // const { profile, error } = this.state;

  return (
    <Container display="flex" flex="column" alignItems="center">
      <InputGroup mb="3" style={{ maxWidth: "24rem" }}>
        <InputGroup.PrependText>First name</InputGroup.PrependText>
        <Form.Input
          type="text"
          name="given_name"
          value={profile.given_name}
          onChange={handleInputChange}
        />
      </InputGroup>
      <InputGroup mb="3" style={{ maxWidth: "24rem" }}>
        <InputGroup.PrependText>Last name</InputGroup.PrependText>
        <Form.Input
          type="text"
          name="family_name"
          value={profile.family_name}
          onChange={handleInputChange}
        />
      </InputGroup>
      <Button primary px="5" onClick={saveProfile}>
        Save
      </Button>
      {error && <Alert warning>{error}</Alert>}
    </Container>
  );
}
