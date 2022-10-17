import React from "react";
import { Box, Typography } from "@mui/material";
import Tick from "@mui/icons-material/Check";
import Img from "../Assets/Images/Angular.png";
import { Link } from "react-router-dom";

const Discussion = ({ discussion, currentUser }) => {
  const { username, img, message } = discussion;
  let { text, statut, date, sender } = message;
  date = new Date(date).toLocaleDateString();
  if (text.length >= 15) text = text.substring(0, 15) + "...";
  return (
    <Box className="item">
      <Link className="link" to={"../"+username}>
        <Box className="flexbox">
          <Box>
            <img src={Img} alt="user" />
          </Box>
          <Box className="text-box">
            <Typography variant="h6" className="username">
              {username}
            </Typography>
            <Typography className="msg-text">
              {text}
              <span className="date">
                {currentUser === sender ? (
                  <>
                    {statut === "send" ? (
                      <Tick className="icon" />
                    ) : statut === "recieved" ? (
                      <>
                        <Tick className="icon recieved" />
                        <Tick className="icon recieved" />
                      </>
                    ) : (
                      <>
                        <Tick className="icon" />
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}
                {"  " + date}
              </span>
            </Typography>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

export default Discussion;
