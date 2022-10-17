import { Paper, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Edit from "@mui/icons-material/Edit";
import Reset from "@mui/icons-material/ResetTvOutlined";
import Check from "@mui/icons-material/Check";
import React,{ useState } from "react";
import SettingNav from "./SettingNav";

function Security() {
  const [edit, setEdit] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handelEdit = () => setEdit(!edit);
  const handelPassword = (e) => setPassword(e.target.value);
  const handelConfirmPassword = (e) => setConfirmPassword(e.target.value);
  const handelDone = () => {
    setEdit(!edit);
  };

  const Form = () => {
    return (
      <div className="user2">
        <Typography variant="h5">Edit Password</Typography>
        <br />
        <div>
          <div>
            <label className="label-form">password</label>
            <input
              type="text"
              placeholder="enter your password"
              className="form-control"
              value={password}
              onChange={handelPassword}
            />
          </div>
          <div>
            <label className="label-form">Confirm password</label>
            <input
              type="text"
              placeholder="confirm your password"
              className="form-control"
              value={confirmPassword}
              onChange={handelConfirmPassword}
            />
          </div>
        </div>
      </div>
    );
  };
  const Interface = () => {
    return (
      <div className="user2">
        <button className="item" onClick={handelEdit}>
          <Typography className="text">Edit password</Typography>
          <Edit className="icon" />
        </button>
        <Link className="item reset" to="../../resetpassword">
          <Typography className="text">Reset password</Typography>
          <Reset className="icon" />
        </Link>
      </div>
    );
  };

  return (
    <div className="setting security">
      <Paper
        elevation={3}
        sx={{
          p: 2,
          width: { xs: "100%", md: "75%" },
          borderRadius: 2,
        }}
      >
        <div className="row">
          <Grid container>
            <Grid item xs={12} md={4} lg={5}>
              <SettingNav />
            </Grid>
            <Grid item xs={12} md={8} lg={7}>
              <div className="box">
                <div className="Title-box">
                  <Typography className="username">Security</Typography>
                  {edit ? (
                    <Button onClick={handelDone}>
                      <Check />
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
                {edit ? <Form /> : <Interface />}
              </div>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
  );
}

export default Security;
