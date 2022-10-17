import Search from "@mui/icons-material/Search";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Users from "@mui/icons-material/PeopleAltRounded";
import Close from "@mui/icons-material/Close";
import { Typography, Paper, Box, Button } from "@mui/material";
import Contact from "./Contact";
import React, { useEffect, useState } from "react";
import { publicRequest } from "../requestMethod";
// import { Link } from "react-router-dom";

function NewMessage({ handelClick, newGrp }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const handelSearch = (e) => {
    setSearch(e.target.value);
  };
  const getUsers = async () => {
    const res = await publicRequest.get("/user");
    setUsers(res.data);
  };

  const searchUser = () => {
    const condition = (user) => {
      return user.username === `${search}` || user.email === search;
    };
    let filteredUsers = users.filter(condition);
    setUsers(filteredUsers);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="new-msg-box">
      <Paper elevation={3} className="box">
        <Typography variant="h6">
          <Button onClick={handelClick}>
            <ArrowBack />
          </Button>{" "}
          Nouveau message
        </Typography>
        <br />
        <Box className="searchGroup">
          <Button
            onClick={ searchUser}
          >
            <Search className="searchIcon" />
          </Button>
          <input
            placeholder="search.."
            className="search"
            value={search}
            onChange={handelSearch}
          />
          {search.length > 0 && (
            <Button
              onClick={() => {
                setSearch("");
                getUsers();
              }}
            >
              <Close className="searchIcon" />
            </Button>
          )}
        </Box>
        <div className="contact-box">
          <div>
            <Button
              className="new-grp"
              onClick={() => {
                handelClick();
                newGrp();
              }}
            >
              <Users className="icon-new" fontSize="large" />
              new group
            </Button>
          </div>
          {users.map((contact, index) => (
            <Contact key={index} contact={contact} handelClick={handelClick} />
          ))}
        </div>
      </Paper>
    </div>
  );
}

export default NewMessage;
