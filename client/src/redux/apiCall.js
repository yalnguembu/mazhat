import { loginFaillure, loginStart, loginSuccess, logOut } from "./userReducer";
import { newMessage, deleteMessage } from "./messageReducer";
import { publicRequest } from "../requestMethod";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    const { _id, username, email } = res.data;
    dispatch(loginSuccess({ id: _id, username, email }));
  } catch (err) {
    dispatch(loginFaillure());
  }
};
export const register = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    const { _id, username, email, password } = res.data;
    dispatch(loginSuccess({ id: _id, username, email, password }));
  } catch (err) {
    dispatch(loginFaillure());
  }
};

export const logout = async (dispatch) => {
  dispatch(logOut());
};

//messages api

export const newmessage = async (dispatch, message) => {
  try {
    const res = await publicRequest.post("/message", message);
    dispatch(newMessage(res.data));
    console.log(res.data)
  } catch (err) {
    dispatch(loginFaillure());
  }
};

export const deletemessage = async (dispatch, id) => {
  try {
    await publicRequest.delete("/message", id);
    dispatch(deleteMessage(id));
  } catch (err) {
    dispatch(loginFaillure());
  }
};
