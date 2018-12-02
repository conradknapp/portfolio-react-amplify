import React, { Component } from "react";
import { Auth } from "aws-amplify";
// import { S3Album } from "aws-amplify-react";
import Album from "./Album";
import WhichDay from "./WhichDay";
import { Container } from "bootstrap-4-react";

const padding = n => {
  return n > 9 ? n : "0" + n;
};

const today = () => {
  const dt = new Date();
  return [
    dt.getFullYear(),
    padding(dt.getMonth() + 1),
    padding(dt.getDate())
  ].join("-");
};

const album_path = user_id => {
  return user_id + "/" + today() + "/";
};

export default class Home extends Component {
  state = {
    user: null,
    day: today()
  };

  componentDidMount() {
    Auth.currentUserInfo().then(user => {
      this.setState({ user });
    });
  }

  render() {
    const { user, day } = this.state;

    if (!user)
      return (
        <Container text="center" p="5">
          Not Authenticated
        </Container>
      );

    if (!user.id)
      return (
        <Container text="center" p="5">
          Unexpected error happened
        </Container>
      );

    // return <S3Album path={album_path(user.id)} picker />;
    return (
      <>
        <WhichDay
          rootPath={user.id + "/"}
          onDaySelected={day => this.setState({ day: day })}
        />
        <Album key={day} path={album_path(user.id, day)} />
      </>
    );
  }
}
