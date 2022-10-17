import React /*,{ useEffect }*/ from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/apiCall";

function LogOut() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    logout(dispatch);
    navigate("../../");
  // useEffect(() => {
  // });
  return <div></div>;
}

export default LogOut;
