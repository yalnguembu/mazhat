import { Box, Paper, Typography, Avatar, Button } from "@mui/material";
import NewMessage from "../Components/NewMessage";
import NewGroup from "../Components/NewGroup";
import NewMessageIcon from "@mui/icons-material/Message";
import Search from "@mui/icons-material/Search";
import Close from "@mui/icons-material/Close";
import Discussion from "../Components/Discussion";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import UserImage from "../Assets/Images/photo pro.jpg";
import { io } from "socket.io-client";

function Chat() {
  const { currentUser } = useSelector((state) => state.user);
  const socket = useRef();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [discussions, setDiscussions] = useState([]);
  const [newMsg, setNewMsg] = useState(false);
  const [newGrp, setNewGrp] = useState(false);

  const handelChange = (e) => {
    setSearch(e.target.value);
  };
  const handelNewMsg = () => setNewMsg(!newMsg);
  const handelNewGrp = () => setNewGrp(!newGrp);

  const searchDisccussion = () => {
    const condition = (discussion) => {
      return (
        discussion.username === search || discussion.message.text === search
      );
    };
    let filteredDiscussion = discussions.filter(condition);
    setDiscussions(filteredDiscussion);
  };
  const getDiscussions = (id) => {
    const URL = `http://localhost:5000/api/conversation/${id}`;
    fetch(URL)
      .then((conversation) => conversation.json())
      .then((json) => {
        setDiscussions(json);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    if (currentUser !== null) {
      getDiscussions(currentUser.id);
      socket.current = io("http://localhost:5000");
      socket.current.emit("add-user", currentUser._id);
    } else navigate("/login");
  }, []);

  return (
    <div className="discussion">
      {newMsg ? (
        <NewMessage handelClick={handelNewMsg} newGrp={handelNewGrp} />
      ) : newGrp ? (
        <NewGroup handelClick={handelNewGrp} />
      ) : (
        <div>
          <Paper elevation={5} square>
            <div className="header">
              <Typography variant="h6" className="top-bar-text">
                MazeChat
              </Typography>
              <Box>
                <Link to="setting" className="link">
                  <Avatar src={UserImage} alt="NGUEMBU YAL" />
                </Link>
              </Box>
            </div>
          </Paper>
          <Box className="discussionList">
            <Box className="searchGroup">
              <Button onClick={() => searchDisccussion()}>
                <Search className="searchIcon" />
              </Button>
              <input
                placeholder="search.."
                className="search"
                value={search}
                onChange={handelChange}
              />
              {search.length > 0 && (
                <Button
                  onClick={() => {
                    setSearch("");
                    getDiscussions();
                  }}
                >
                  <Close className="searchIcon" />
                </Button>
              )}
            </Box>
            {discussions.map((discussion, index) => (
              <Discussion discussion={discussion} key={index} />
            ))}
            {discussions.length === 0 && search.length > 0 ? (
              <div>Aucune discussion ne correspond a votre recherche</div>
            ) : (
              <></>
            )}
            {discussions.length === 0 && search.length === 0 ? (
              <div>aucune discussion ne correspond</div>
            ) : (
              <></>
            )}
          </Box>
          <button className="new-msg-btn" onClick={handelNewMsg}>
            <NewMessageIcon />
          </button>
        </div>
      )}
    </div>
  );
}

export default Chat;
