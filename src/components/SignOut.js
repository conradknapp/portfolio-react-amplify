import React from "react";
import { Button } from "bootstrap-4-react";
import { Auth } from "aws-amplify";

export default function SignOut() {
  const handleSignout = async () => {
    try {
      await Auth.signOut();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button light outline sm border="0" onClick={handleSignout}>
      Sign Out
    </Button>
  );
}
