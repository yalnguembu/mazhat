import { useNavigate } from "react-router-dom";
import React,{ useEffect } from "react";

function Setting() {
  const href = useNavigate();
  
  useEffect(() => {
    href("profile");
  });

  return <div>yeah</div>;
}

export default Setting;
