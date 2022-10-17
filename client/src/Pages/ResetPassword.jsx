import { Paper, Typography, Stack, Button } from "@mui/material";
import React,{ useState } from "react";
// import { useNavigate } from "react-router-dom";
import Email from "@mui/icons-material/EmailOutlined";
import Lock from "@mui/icons-material/LockOutlined";
import Eyes from "@mui/icons-material/RemoveRedEyeSharp";
import Eye from "@mui/icons-material/RemoveRedEyeOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../redux/apiCall";

function ResetPassword() {
  // let navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [lock, setLock] = useState(true);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  // const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handelLock = () => setLock(!lock);
  const handelEmail = (e) => setEmail(e.target.value);
  const handelCode = (e) => setCode(e.target.value);
  const handelPassword = (e) => setPassword(e.target.value);
  const handelConfPassword = (e) => setConfPassword(e.target.value);
  const handelStep = (step) => setStep(step);
  const handelClickEmail = () => {
    setEmail("");
    // login(dispatch,email);
    handelStep(1);
  };
  const handelClickCode = () => {
    // login(dispatch,code);
    handelStep(2);
    setCode("");
  };
  const handelClickPassword = () => {
    // login(dispatch, { email, password });
    setPassword("");
    setConfPassword("");
  };

  const First = () => {
    return (
      <Stack spacing={2}>
        <Typography className="h1">Reset password</Typography>
        <Typography className="h2">
          Enter your email to reset your password
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
        <Button
          fullWidth
          onClick={handelClickEmail}
          className="submit-btn"
          disabled={isFetching}
        >
          {isFetching ? (
            <>
              <CircularProgress className="loader" /> <span>Loging...</span>
            </>
          ) : (
            <span>Reset</span>
          )}
        </Button>
        {error && (
          <Typography className="error">
            Sorry you email is not assiociate to any account
          </Typography>
        )}
      </Stack>
    );
  };
  const Second = () => {
    return (
      <Stack spacing={2}>
        <Typography className="h1">Verification</Typography>
        <Typography className="h2">
          We have send a code to {email} <br />
          Enter this code to reset your password
        </Typography>
        <label className="label-form">Code</label>
        <div className="form-control">
          <Email className="icon" />
          <input
            type="text"
            placeholder="enter the code"
            className="login-form"
            value={code}
            onChange={handelCode}
          />
        </div>
        <Button
          fullWidth
          onClick={handelClickCode}
          className="submit-btn"
          disabled={isFetching}
        >
          {isFetching ? (
            <>
              <CircularProgress className="loader" /> <span>Loging...</span>
            </>
          ) : (
            <span>Reset</span>
          )}
        </Button>
        {error && (
          <Typography className="error">
            Sorry you email is not assiociate to any account
          </Typography>
        )}
      </Stack>
    );
  };
  const Third = () => {
    return (
      <Stack spacing={2}>
        <Typography className="h1">Reset password</Typography>
        <Typography className="h2">
          Enter your email to reset your password
        </Typography>
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
        <label className="label-form">Confirm Password</label>
        <div className="form-control">
          <Lock className="icon" />
          <input
            type={lock ? "password" : "text"}
            placeholder="confirm your password"
            className="login-form"
            value={confPassword}
            onChange={handelConfPassword}
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
        <Button
          fullWidth
          onClick={handelClickPassword}
          className="submit-btn"
          disabled={isFetching}
        >
          {isFetching ? (
            <>
              <CircularProgress className="loader" /> <span>Loging...</span>
            </>
          ) : (
            <span>Reset</span>
          )}
        </Button>
        {error && (
          <Typography className="error">
            Sorry you email is not assiociate to any account
          </Typography>
        )}
      </Stack>
    );
  };

  const Stepper = () => {
    switch (step) {
      case 1:
        return <Second />;
      case 2:
        return <Third />;
      default:
        return <First />;
    }
  };

  return (
    <div className="authContainer">
      <Paper
        elevation={3}
        sx={{
          p: 2,
          width: { xs: "100%", md: "50%", lg: "33.33%" },
          borderRadius: 2,
        }}
      >
        <Stepper />
      </Paper>
    </div>
  );
}

export default ResetPassword;
