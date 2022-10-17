import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import Notifications from "@mui/icons-material/Notifications";
import Person from "@mui/icons-material/Person";
import BackArrow from "@mui/icons-material/ArrowBackIos";
import Lock from "@mui/icons-material/Lock";
import Logout from "@mui/icons-material/Logout";
import Share from "@mui/icons-material/Share";
import UserImage from "../Assets/Images/photo pro.jpg";
import { useSelector } from "react-redux";

function SettingNav() {
  const { currentUser } = useSelector((state) => state.user);
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
  useEffect(() => {
    if (currentUser) getInfos();
  },[]);
  return (
    <div>
      <div className="user">
        <img src={UserImage} alt="" className="img" />
        <div>
          <Typography className="username">{infos.username}</Typography>
          <Typography className="email">{infos.email}</Typography>
        </div>
      </div>
      <Link className="link" to="../..//">
        <Typography>
          <BackArrow className="icon" /> Back
        </Typography>
      </Link>
      <Link to="../profile" className="link">
        <Typography>
          <Person className="icon" /> Profile
        </Typography>
      </Link>
      <Link to="../security" className="link">
        <Typography>
          <Lock className="icon" /> Security
        </Typography>
      </Link>
      <Link to="../notification" className="link">
        <Typography>
          <Notifications className="icon" /> Notifications
        </Typography>
      </Link>
      <Link to="../Security" className="link">
        <Typography>
          <Share className="icon" /> Share
        </Typography>
      </Link>
      <Link to="../logout" className="link">
        <Typography>
          <Logout className="icon" /> Logout
        </Typography>
      </Link>
    </div>
  );
}

export default SettingNav;
