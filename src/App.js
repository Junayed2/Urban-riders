import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NotFound from "./components/NotFound/NotFound";
import Login from "./components/Login/Login";
import { createContext, useState } from "react";
import Private from "./components/PrivateRoute/Private";
import Destination from "./components/Destination/Destination";
import Home from "./components/Home/Home";
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Private path="/destination/:name">
            <Destination></Destination>
          </Private>
          <Private path="/destination">
            <Destination></Destination>
          </Private>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
