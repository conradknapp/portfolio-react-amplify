import React, { useReducer, useContext } from "react";
// import { Auth } from "aws-amplify";

import Main from "./components/Main";
import Navigation from "./components/Navigation";
import reducer from "./reducer";
import "./App.css";

export const AppContext = React.createContext({
  profile: {}
});
// const initialState = {};

export default function App() {
  const initialState = useContext(AppContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect(() => {
  //   Auth.currentUserInfo().then(user => {
  //     dispatch({ type: "GET_USER_INFO", payload: user });
  //   });
  // }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Navigation profile={state.profile} />
      <Main />
    </AppContext.Provider>
  );
}
