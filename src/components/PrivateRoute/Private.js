import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { UserContext } from "../../App";

const Private = ({ children, ...rest }) => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const { email, accessToken } = loggedInUser;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        email || accessToken ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default Private;
