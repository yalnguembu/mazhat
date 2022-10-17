import ArrowBack from "@mui/icons-material/ArrowBack";
import { Typography, Paper, Button, TextField } from "@mui/material";
import Participant from "./Participant";
import React, { useEffect, useState } from "react";
import { publicRequest } from "../requestMethod";

function NewGroup({ handelClick }) {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
   const res = await publicRequest.get("/user");
   setUsers(res.data);
  };
  useEffect(() => {
    getUsers();
  }, []);
  const select = (index)=>{

  }
  return (
    <div className="new-msg-box">
      <Paper elevation={3} className="box">
        <Typography variant="h6">
          <Button onClick={handelClick}>
            <ArrowBack />
          </Button>{" "}
          Nouveau groupe
        </Typography>
        <br />
          <TextField label="group name" fullWidth className="group-name"/>
        <div className="participant-box">
          <Typography variant="h6">Participants</Typography>
          {users.map((participant,index) => (
            <Participant
              key={index}
              participant={participant}
              handelClick={select(index)}
            />
          ))}
        </div>
      </Paper>
    </div>
  );
}

export default NewGroup;
