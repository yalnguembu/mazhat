import { Paper, Typography, Stack, Button } from "@mui/material";
import React,{ useState,useEffect } from "react";
import { Link ,useNavigate} from "react-router-dom";
import Email from "@mui/icons-material/EmailOutlined";
import Lock from "@mui/icons-material/LockOutlined";
import Person from "@mui/icons-material/Person";
import Eyes from "@mui/icons-material/RemoveRedEyeSharp";
import Eye from "@mui/icons-material/RemoveRedEyeOutlined";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/apiCall";

function Register() {
  const navigate = useNavigate();
  const [lock, setLock] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error,currentUser } = useSelector((state) => state.user);

  const handelLock = () => setLock(!lock);
  const handelEmail = (e) => setEmail(e.target.value);
  const handelUsername = (e) => setUsername(e.target.value);
  const handelPassword = (e) => setPassword(e.target.value);
  const handelClick = () => {
    register(dispatch, { email, username, password });
    console.log({ email, username, password });
    setEmail("");
    setUsername("");
    setPassword("");
  };
  useEffect(() => {
    if (currentUser !== null) {
      navigate("..//");
    }
  },[]);
  return (
    <div className="authContainer">
      <Paper
        elevation={3}
        sx={{ p: 2, width: { xs: "100%", md: "30.33%" }, borderRadius: 2 }}
      >
        <Stack spacing={2}>
          <Typography className="h1">Salut, bienvenu!</Typography>
          <Typography className="h2">
            S'il vous plait Entrez vos information pour vous Enregistrer
          </Typography>
          <label className="label-form">Email</label>
          <div className="form-control">
            <Email className="icon" />
            <input
              type="text"
              placeholder="enter your email"
              className="login-form"
              value={email}
              onChange={handelEmail}
            />
          </div>
          <label className="label-form">username</label>
          <div className="form-control">
            <Person className="icon" />
            <input
              type="text"
              placeholder="enter your username"
              className="login-form"
              value={username}
              onChange={handelUsername}
            />
          </div>
          <label className="label-form">Password</label>
          <div className="form-control">
            <Lock className="icon" />
            <input
              type={lock ? "password" : "text"}
              placeholder="enter your password"
              className="login-form"
              value={password}
              onChange={handelPassword}
            />
            {lock ? (
              <Button onClick={handelLock}>
                <Eyes className="icon" />
              </Button>
            ) : (
              <Button onClick={handelLock}>
                <Eye className="icon" />
              </Button>
            )}
          </div>
          <Typography color="gray">
            <Link to="/register" className="link">
              Forget Password?
            </Link>
          </Typography>
          <Button
            fullWidth
            onClick={handelClick}
            className="submit-btn"
            disabled={isFetching}
          >
            Login
          </Button>
          {!error && (
            <Typography className="error">
              Please verified your information
            </Typography>
          )}
          <Typography className="h3">
            pas encore inscrit?{" "}
            <Link to="/login" className="link">
              Inscription
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </div>
  );
}

export default Register;
