import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Discussion from "./Pages/Discussion";
import Conversation from "./Pages/Conversation";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Setting from "./Pages/Setting";
import LogOut from "./Components/Logout";
import Profile from "./Components/Profile";
import Security from "./Components/Security";
import NotFound from "./Components/NotFound";
import ResetPassword from "./Pages/ResetPassword";
import SelectDiscussion from "./Components/SelectDiscussion";

function App() {
  return (
    <div className="mainContainer">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="setting" element={<Outlet />}>
              <Route index element={<Setting />} />
              <Route path="profile" element={<Profile />} />
              <Route path="security" element={<Security />} />
              <Route path="notification" element={<Profile />} />
              <Route path="logout" element={<LogOut />} />
            </Route>
            <Route path="resetpassword" element={<ResetPassword />} />
            <Route path="/" element={<Discussion />} />
            <Route path="/:id" element={<Discussion />} />
            <Route path="/*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
