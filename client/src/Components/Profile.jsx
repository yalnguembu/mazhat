import { Paper, Typography, Button, Grid } from "@mui/material";
import Edit from "@mui/icons-material/Edit";
import Camera from "@mui/icons-material/Camera";
import Check from "@mui/icons-material/Check";
import userImg from "../Assets/Images/Adobe_XD.png";
import React, { useState, useEffect } from "react";
import SettingNav from "./SettingNav";
import { useSelector } from "react-redux";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [edit, setEdit] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  // const [picture, setPicture] = useState("");
  const [infos, setInfos] = useState({});

  const getInfos = () => {
    const URL = `http://localhost:5000/api/user/${currentUser.id}`;
    fetch(URL)
      .then((conversation) => conversation.json())
      .then((json) => {
        setInfos(json);
      })
      .catch((err) => console.error(err));
  };
  const handelEdit = () => setEdit(!edit);
  const handelEmail = (e) => setEmail(e.target.value);
  const handelUsername = (e) => setUsername(e.target.value);
  const handelDone = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    if (currentUser) getInfos();
  },[]);
  const Form = () => {
    return (
      <div className="user3">
        <div className="imgBox">
          <img src={userImg} alt="" className="img" />
          <label onClick={handelDone} className="button">
            <Camera />
          </label>
          <input type="file" name="picture" id="" className="picture-hidden" />
        </div>
        <div>
          <div>
            <label className="label-form">{username}</label>
            <input
              type="text"
              placeholder="enter your username"
              className="form-control"
              value={username}
              onChange={handelUsername}
            />
          </div>
          <div>
            <label className="label-form">{email}</label>
            <input
              type="text"
              placeholder="enter your email"
              className="form-control"
              value={email}
              onChange={handelEmail}
            />
          </div>
        </div>
      </div>
    );
  };
  const Interface = () => {
    return (
      <div className="user2">
        <img src={userImg} alt="" className="img" />
        <div>
          <div className="item">
            <Typography className="email">Username</Typography>
            <Typography className="username">{infos.username}</Typography>
          </div>
          <div className="item">
            <Typography className="email">adresse email</Typography>
            <Typography className="username">{infos.email}</Typography>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="setting">
      <Paper
        elevation={3}
        sx={{
          p: 2,
          width: { xs: "100%", md: "75%" },
          borderRadius: 2,
        }}
      >
        <div className="row">
          <Grid container>
            <Grid item xs={12} md={4} lg={5}>
              <SettingNav />
            </Grid>
            <Grid item xs={12} md={8} lg={7}>
              <div className="box">
                <div className="Title-box">
                  <Typography className="username">Profile</Typography>
                  {edit ? (
                    <Button onClick={handelDone}>
                      <Check />
                    </Button>
                  ) : (
                    <Button onClick={handelEdit}>
                      <Edit />
                    </Button>
                  )}
                </div>
                {edit ? <Form /> : <Interface />}
              </div>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
  );
}

export default Profile;
