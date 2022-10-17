import { Box, Typography } from "@mui/material";
import Img from "../Assets/Images/Angular.png";
import { Link } from "react-router-dom";
import React from "react";

const Contact = ({ contact, handelClick }) => {
  const {username, email } = contact;

  return (
    <Box className="item">
      <Link className="link" to={username} onClick={handelClick}>
        <Box className="flexbox">
          <Box>
            <img src={Img} alt="userimage" />
          </Box>
          <Box className="text-box">
            <Typography variant="h6" className="username">
              {username}
            </Typography>
            <Typography className="msg-text"> {email}</Typography>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

export default Contact;
