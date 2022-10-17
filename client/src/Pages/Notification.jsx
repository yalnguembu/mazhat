import React,{ useRef, useEffect } from "react";
import { io } from "socket.io-client";

function Notification() {
  const socket = useRef();

  useEffect(() => {
    socket.current = io("localhost:5000");
    socket.current.on("connection", () => {
      console.log("connected to server");
    });
  }, []);

  const handelClick = () => {
    socket.current.emit("message", new Date().getTime());
  };
  return (
    <div>
      <h1> Notification 2</h1>
      <button onClick={handelClick}>emit a time</button>
    </div>
  );
}

export default Notification;
