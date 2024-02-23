import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Outlet, Navigate, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./style.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import Friends from "./components/friends/Friends";
import { ToastContainer } from "react-toastify";
import Followers from "./pages/followers/Followers";
import Following from "./pages/followers/Following";
function App() {
  const { currentUser } = useContext(AuthContext);

  const { darkMode } = useContext(DarkModeContext);

  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  return (
    <Routes>
      {/* <RouterProvider router={router} /> */}
      <Route
        path="/"
        element={currentUser ? <Layout /> : <Navigate to="/login" replace />}
      >
        <Route path={"/"} element={<Home />} />
        <Route path={"/profile/:username"} element={<Profile />} />
        <Route path="/friends" element={<Friends />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/followers" element={<Followers />} />
      <Route path="/following" element={<Following />} />
      <Route path="*" element={<h1>404 page not found</h1>} />
    </Routes>
  );
}

export default App;
