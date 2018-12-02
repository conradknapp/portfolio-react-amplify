import React, { useReducer, useContext } from "react";

import Main from "./components/Main";
import Navigation from "./components/Navigation";
import reducer from "./reducer";
import "./App.css";

export const AppContext = React.createContext({});
// const initialState = {};

export default function App() {
  const initialState = useContext(AppContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Navigation />
      <Main />
    </AppContext.Provider>
  );
}
