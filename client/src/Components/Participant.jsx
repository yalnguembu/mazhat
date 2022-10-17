import { Box, Typography} from "@mui/material";
import Img from "../Assets/Images/Angular.png";
// import { Link } from "react-router-dom";
import Check from "@mui/icons-material/Check";
import React from "react";

const Contact = ({ participant, handelClick, selected }) => {
  selected=true;
  const {  username, email } = participant;
  return (
    <Box className="item">
      <button className={selected ? "link selected" : "link"} onClick={handelClick}>
        <Box className="flexbox">
          <Box>
            {selected ? <Box className="box-check"><Check /></Box> : <img src={Img} alt="userimage" />}
          </Box>
          <Box className="text-box">
            <Typography className="username">{username}</Typography>
            <Typography className="msg-text"> {email}</Typography>
          </Box>
        </Box>
      </button>
    </Box>
  );
};

export default Contact;
