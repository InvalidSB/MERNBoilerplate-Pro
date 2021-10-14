import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {   signout } from "../helpers/auth";
import { ListItem,ListItemIcon, ListItemText } from "@material-ui/core";

import "./App.css";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({}));

function Home(props) {
  const history = useHistory();

  const { fname, lname, ProfilePic } = props;

  const classes = useStyles();

  return (
    <div className="Home">
      <Navbar
        fname={fname}
        lname={lname}
        ProfilePic={ProfilePic}
      />
      <ToastContainer />
      <div style={{margin:"150px auto"}}>
        <h1 style={{fontSize:80,textAlign:"center",fontStyle:"poppins",color:"black",fontWeight:900}}>This is Home</h1>

      </div>
      <hr style={{ margin: "30px 0px" }} />
      <p style={{float:"right"}}>InvalidSB</p>
      <button
                onClick={() => {
                  signout(() => {
                    toast.error("Signout Successfully");
                    history.push("/");
                  });
                }}
              >
               
                
              SignOut
              </button>
    </div>
  );
}

export default Home;
