import React from "react";
import { useHistory } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
// import MusicNoteOutlinedIcon from "@material-ui/icons/MusicNoteOutlined";
import "./Navbar.css";
import Chip from "@material-ui/core/Chip";
// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
const useStyles = makeStyles((theme) => ({
  tool: {
    display: "flex",
    justifyContent: "space-between",
  },

  profile: {
    height: "40px",
    width: "40px",
    float: "right",
  },
  profileBtn: {
    textDecoration: "none",
    // color: "blue",
    // backgroundColor:"#00001a",
    padding: 10,
    fontSize: 16,
  },
}));

function Navbar(props) {
  const history = useHistory();

  const redirect = () => {
    history.push("/inner");
  };

  const { fname, lname, ProfilePic,backicon } = props;
if(backicon == true){
  console.log("string raixa")
}
  const classes = useStyles();
  return (
    <div>
      <AppBar
        position="sticky"
        style={{
          backgroundColor: "transparent",
          color: "white",
          marginBottom: "20px",
        }}
      >
        <Toolbar className={classes.tool}>
         
         
          {backicon?  <p onClick={redirect} style={{color:"black",cursor:"pointer"}}>Back</p> :
             <p
             style={{ backgroundColor: "none",color:"black" }}
           >Home</p>
     
          }
          <Link to="/profile">
            <Chip
              avatar={
                <Avatar alt={fname} src={ProfilePic} style={{ size: 30 }} />
              }
              clickable
              label={fname + " " + lname}
              fontSize={12}
              variant="outlined"
              color="secondary"
              className={classes.profileBtn}
            />
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
