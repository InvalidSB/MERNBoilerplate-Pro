import React, { useState, useEffect } from "react";
import "./Profilepage.css";
import { updateUser, isAuth, getCookie, signout } from "../helpers/auth";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Navbar from "./Navbar";

import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    color: "black",
    backgroundColor: "white",
    border: "2px solid #000",
    borderRadius: 20,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
    width: "500px",
  },
}));

const styles = (theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function Profile({ history }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [personData, setPersonData] = useState({
    _id: "",
    fname: "",
    lname: "",
    email: "",
    password1: "",
    Bio: "",
    ProfilePic: "",
    Gender: "",
    DateOfBirth: "",
    Location: {
      Country: "",
      Street: "",
      City: "",
    },

    textChange: "Update",
    role: "",
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
        const {
          role,
          fname,
          Bio,
          ProfilePic,
          lname,
          email,
          Gender,
          Location,
          DateOfBirth,
          following,
          followers,
        } = res.data;
        // console.log(res.data);
        setPersonData({
          ...personData,

          role,
          ProfilePic,
          fname,
          lname,
          Bio,
          email,
          Gender,
          Location,
        
          DateOfBirth,
          following,
          followers,
        });
      })
      .catch((err) => {
        toast.error(`Error To Your Information ${err.response.statusText}`);
        if (err.response.status === 401) {
          signout(() => {
            history.push("/login");
            console.log(
              " ta yo thau ma yo bato hudai aako hos" + history.location
            );
          });
        }
      });
  };

  useEffect(() => {

    loadProfile();
   
  }, []);

  const {
    fname,
    lname,
    email,
    password1,
    ProfilePic,
    textChange,
    Bio,
    role,
    Gender,
    Location,
    DateOfBirth,
  } = personData;
  
  const handleChange = (text) => (e) => {
    setPersonData({ ...personData, [text]: e.target.value });
  };
  const handleSubmit = (e) => {
    const token = getCookie("token");
    e.preventDefault();
    setPersonData({ ...personData, textChange: "Submitting" });
    axios
      .put(
        `http://localhost:5000/api/user/update`,
        {
          fname: fname,
          lname: lname,
          email: email,
          Bio: Bio,
          ProfilePic: ProfilePic,
          password: password1,
          Location: Location,
          Gender: Gender,
          DateOfBirth: DateOfBirth,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // console.log(personData);
        updateUser(res, () => {
          toast.success("Profile Updated Successfully");
          setPersonData({ ...personData, textChange: "Update" });
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };







  
 
 



  return (
    <>
     <Navbar
        fname={fname}
        lname={lname}
        ProfilePic={ProfilePic}
        backicon={true}
      />
      <ToastContainer />

      <div className="Profilepage">
        <div className="Upper-Part">
          <div className="image-part">
            <div className="imgWrapper">
              <img src={ProfilePic} />
            </div>
          </div>
          <div className="info-part">
            <div className="name">
              <h2>
                {fname}&nbsp;
                {lname}
              </h2>
            </div>

            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClickOpen}
            >
              Edit Profile
            </Button>

            <div className="Short_bio">
              <p> {Bio}</p>
            </div>

            <div></div>
          </div>
        </div>

      

        {/* try hunexa yaha start */}

        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          className="dialog"
          maxWidth={"md"}
          fullWidth={true}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
            className="dialog-title"
          >
            Edit Profile
          </DialogTitle>
          <DialogContent dividers className="dialog-vitrako">
            <form
              className="w-full flex-1 mt-8 text-blue-700"
              onSubmit={handleSubmit}
              className="form"
            >
              <div className="mx-auto max-w-xs relative ">
                <TextField
                  id="outlined-secondary"
                  label="Who are You?"
                  variant="outlined"
                  color="secondary"
                  autoFocus
                  margin="dense"
                  type="name"
                  placeholder="Role"
                  fullWidth
                  value={role}
                />
                <TextField
                  id="outlined-secondary"
                  label="Your email :"
                  variant="outlined"
                  color="secondary"
                  autoFocus
                  margin="dense"
                  type="email"
                  placeholder="Email"
                  fullWidth
                  value={email}
                />
                <TextField
                  id="outlined-secondary"
                  label="Your first name :"
                  variant="outlined"
                  color="secondary"
                  autoFocus
                  margin="dense"
                  type="name"
                  fullWidth
                  value={fname}
                  onChange={handleChange("fname")}
                />
                <TextField
                  id="outlined-secondary"
                  label="Your last name :"
                  variant="outlined"
                  color="secondary"
                  autoFocus
                  margin="dense"
                  type="name"
                  fullWidth
                  value={lname}
                  onChange={handleChange("lname")}
                />
                <TextField
                  id="outlined-secondary"
                  label="Your bio :"
                  variant="outlined"
                  color="secondary"
                  autoFocus
                  margin="dense"
                  type="name"
                  fullWidth
                  value={Bio}
                  onChange={handleChange("Bio")}
                />
                <TextField
                  id="outlined-secondary"
                  label="Change the password ?"
                  variant="outlined"
                  color="secondary"
                  autoFocus
                  margin="dense"
                  type="password"
                  fullWidth
                  value={password1}
                  onChange={handleChange("password1")}
                />
                <TextField
                  id="outlined-secondary"
                  label="Your Location"
                  placeholder="Street,City,Country"
                  variant="outlined"
                  color="secondary"
                  autoFocus
                  margin="dense"
                  type="text"
                  fullWidth
                  value={Location}
                  onChange={handleChange("Location")}
                />
               
                
                <TextField
                  id="outlined-secondary"
                  label="Photo's Link"
                  variant="outlined"
                  color="secondary"
                  className="input-field"
                  autoFocus
                  margin="dense"
                  type="text"
                  fullWidth
                  value={ProfilePic}
                  onChange={handleChange("ProfilePic")}
                />
                <h3 style={{ color: "black" }}>Date Of Birth:</h3>
                <TextField
                  id="outlined-secondary"
                  label=""
                  variant="outlined"
                  color="secondary"
                  className="input-field"
                  autoFocus
                  margin="dense"
                  type="date"
                  fullWidth
                  value={DateOfBirth}
                  onChange={handleChange("DateOfBirth")}
                />
                <RadioGroup
                  aria-label="quiz"
                  name="quiz"
                  value={Gender}
                  onChange={handleChange("Gender")}
                >
                  <h3 style={{ color: "black" }}>Gender:{Gender}</h3>

                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="Male"
                    style={{ color: "black" }}
                  />
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="female"
                    style={{ color: "black" }}
                  />
                </RadioGroup>

                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-red-300 text-gray-100 w-full py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <i className="fas fa-user-plus fa 1x w-6  -ml-2" />
                  <span className="ml-3">{textChange}</span>
                </button>
              </div>
            </form>
          </DialogContent>
          <DialogActions className="dialog-bottom">
            <Button
              autoFocus
              onClick={handleClose}
              variant="outlined"
              color="secondary"
            >
              Save changes
            </Button>
          </DialogActions>
        </Dialog>

        <hr />
        <div style={{margin:"150px auto"}}>
        <h1 style={{fontSize:80,textAlign:"center",fontStyle:"poppins",color:"black",fontWeight:900}}>This is Profile page</h1>

      </div>
      <hr style={{ margin: "30px 0px" }} />
      <p style={{float:"right"}}>InvalidSB</p>
      
      </div>
    </>
  );
}

export default Profile;