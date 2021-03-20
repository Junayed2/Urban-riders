import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./firebase.config";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
  });
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setLoggedInUser(signedInUser);
        history.replace(from);
        setUser(signedInUser);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
      });
  };

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        const user = {
          isSignedIn: false,
          name: "",
          email: "",
          photo: "",
          error: "",
          success: false,
        };
        setLoggedInUser(user);
        setUser(user);
        console.log("sign in user info", res.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      const isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          const signedInUser = {
            isSignedIn: true,
            email: user.email,
            password: user.password,
          };
          setLoggedInUser(signedInUser);
          history.replace(from);
          setUser(newUserInfo);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();
  };
  const updateUserName = (name) => {
    const user = firebase.auth().currentUser;
    user
      .updateProfile({
        displayName: name,
      })
      .then(function () {
        console.log("user name update successfully");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="App">
      <h1>Our own Authentication</h1>
      <div
        style={{
          border: "1px solid black",
          width: "50%",
          margin: "auto",
          borderRadius: "6px",
        }}
      >
        <input
          onChange={() => setNewUser(!newUser)}
          type="checkbox"
          name="newUser"
          id=""
        />
        <label htmlFor="">New User Sign up</label>
        <form onSubmit={handleSubmit}>
          {newUser && (
            <input
              style={{
                width: "80%",
                padding: " 12px 20px",
                margin: "8px 0",
                boxSizing: "border-box",
                border: "none",
                borderBottom: "2px solid red",
              }}
              name="name"
              onBlur={handleBlur}
              type="text"
              placeholder="Your name"
            />
          )}
          <input
            style={{
              width: "80%",
              padding: " 12px 20px",
              margin: "8px 0",
              boxSizing: "border-box",
              border: "none",
              borderBottom: "2px solid red",
            }}
            type="text"
            onBlur={handleBlur}
            name="email"
            placeholder=" your email"
            required
          />
          <br></br>
          <input
            style={{
              width: "80%",
              padding: " 12px 20px",
              margin: "8px 0",
              boxSizing: "border-box",
              border: "none",
              borderBottom: "2px solid red",
            }}
            type="password"
            onBlur={handleBlur}
            name="password"
            placeholder="your password"
            required
          />
          <br></br>
          <input type="submit" value={newUser ? "sign up" : "sign in"} />
        </form>
        <p style={{ color: "red" }}>{user.error}</p>
        {user.success && (
          <p style={{ color: "green" }}>
            User {newUser ? "Created" : "Logged In"} Successfully
          </p>
        )}
      </div>
      <br />

      <div>
        {user.isSignedIn ? (
          <button style={{ borderRadius: "8px" }} onClick={handleSignOut}>
            Sign out
          </button>
        ) : (
          <button
            style={{ borderRadius: "8px", width: "40%" }}
            onClick={handleGoogleSignIn}
          >
            Sign in with Google
          </button>
        )}
        <br />

        {user.isSignedIn && (
          <div>
            <p>Welcome,{user.name}</p>
            <p>Your Email:{user.email}</p>
            <img src={user.photo} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
