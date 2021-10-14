import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
 
  Container,
} from "@material-ui/core";
import Home from "./Home";
import Profile from "./Profile";

import SvgIcon from "@material-ui/core/SvgIcon";

import axios from "axios";
import { isAuth, getCookie, signout } from "../helpers/auth";

const useStyles = makeStyles((theme) => ({
  bgcolor: {
    backgroundColor: "#0d0d0d",
    padding: 0,
    margin: 0,
  },
  link: {
    textDecoration: "none",
    color: "white",
  },

  root: {
    "& > svg": {
      margin: theme.spacing(2),
    },
    MuiContainer: {
      width: "100%",
    },
  },

  signout: {
    color: "rgb(235, 5, 51)",
    top: 10,
    fontSize: 25,
  },
  signoutplace: {
    position: "absolute",
    marginTop: 200,
  },
}));
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
function InnerApp({ history }) {
  const [personData, setPersonData] = useState({
    fname: "",
    lname: "",
    ProfilePic: "",
  });
  const loadProfile = () => {
    const token = getCookie("token");

    axios
      .get(`http://localhost:5000/api/user/${isAuth()._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { fname, lname, ProfilePic, email } = res.data;

        setPersonData({
          ...personData,
          fname,
          lname,
          ProfilePic,
          email,
        });
      })
      .catch((err) => {
        toast.error(
          `Sorry ,Due to some internet Issue we couldnot load your information ${err.response.statusText}`
        );
      });
  };
  useEffect(() => {
    loadProfile();
  }, []);
  const { fname, lname, ProfilePic, } = personData;

  const classes = useStyles();
  return (
    <div 
    // className={classes.bgcolor}
    >
      <Router>
        <div>
          <Switch>
            <Route exact path="/inner">
              <Container className={classes.container}>
                <Home fname={fname} lname={lname} ProfilePic={ProfilePic} />
              </Container>
            </Route>

            <Route exact path="/profile" >
              <Container>
                <Profile />
              </Container>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default InnerApp;
