import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Message from "../Components/Message";
import { newmessage } from "../redux/apiCall";
import { Box, Button, Paper, Typography } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Send from "@mui/icons-material/Send";
import Call from "@mui/icons-material/Phone";
import Menu from "@mui/icons-material/Menu";
import Emoji from "@mui/icons-material/EmojiEmotions";
import NoMessage from "../Components/NoMessage";

function Conversations({ socket, user, id }) {
  const scroll = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  console.log(user);
  const getMessages = () => {
    let isMounted = true;
    if ((id !== null) & (user !== null)) {
      const URL = `http://localhost:5000/api/message/${user.id}?receiver=${id}`;
      fetch(URL)
        .then((message) => message.json())
        .then((json) => {
          if (isMounted) setMessages(json);
        })
        .catch((err) => console.error(err));
    }
    return () => {
      isMounted = false;
    };
  };

  const sendMessage = (message) => {
    const msg = {
      text: message,
      statut: "send",
      sender: user.id,
      receiver: id,
    };
    newmessage(dispatch, msg);
    socket.current.emit("send-msg", msg);
  };
  socket.current.on("msg-recieve", () => {
    getMessages();
  });
  // }
  useEffect(() => {
    if (user === null) {
      navigate("../login");
    } else {
      getMessages();
    }
  }, []);

  const Messages = () => {
    useEffect(() => scroll.current.scrollIntoView(), []);
    console.log("me");
    return (
      <Box className="messages-list">
        <div ref={scroll}>
          {messages.length > 0 ? messages.map((message, index) => {
            return (
              <div key={index}>
                <Message message={message} me={user.id} />
              </div>
            );
          }) 
          : 
          <NoMessage />
          }
        </div>

        <span ref={scroll} style={{ color: "#fff" }}>
          .
        </span>
        <span ref={scroll}></span>
      </Box>
    );
  };

  return (
    <div className={id !== "" ? "conversation id" : "conversation"}>
      <Paper elevation={3} square>
        <div className="flexbox">
          <Link to="..//" className="back-icon">
            <ArrowBack />
          </Link>
          <Typography variant="h6" className="topBarText">
            {id}
          </Typography>
          <div className="">
            <Button>
              <Call />
            </Button>
            <Button>
              <Menu />
            </Button>
          </div>
        </div>
      </Paper>
      <Messages />
      <ChatInput handelClick={sendMessage} />
    </div>
  );
}

const ChatInput = ({ handelClick }) => {
  const [message, setMessage] = useState("");
  const handelKeyUp = (e) => {
    if (e.key === "Enter") handelSend();
  };
  const handelMessage = (e) => {
    setMessage(e.target.value);
  };
  const handelSend = () => {
    if (message.length > 0) {
      handelClick(message);
      setMessage("");
    }
  };

  return (
    <Box className="flexbox textZone">
      <Button>
        <Emoji fontSize="large" color="primary" />
      </Button>
      <input
        placeholder="Saisissez votre message.."
        className="type"
        value={message}
        onChange={handelMessage}
        onKeyUp={handelKeyUp}
      />
      <Button onClick={handelSend}>
        <Send fontSize="large" color="primary" />
      </Button>
    </Box>
  );
};
export default Conversations;
