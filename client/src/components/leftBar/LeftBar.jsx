import "./leftBar.scss";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import SearchImg from "../../assets/search.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const LeftBar = ({ className }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className={`leftBar`}>
      <div className="container">
        <div className="menu">
          <div className="item">
            <Link
              to={"/profile/" + currentUser.username}
              style={{ textDecoration: "none" }}
            >
              <img src={"/upload/" + currentUser.profilePic} alt="" />
              <span>{currentUser.name}</span>
            </Link>
          </div>
          <div className="item">
            <Link to={"/followers"} style={{ textDecoration: "none" }}>
              <img src={Groups} alt="" />
              <span>followers</span>
            </Link>
          </div>
          <div className="item">
            <Link to={"/following"} style={{ textDecoration: "none" }}>
              <img src={Friends} alt="" />
              <span>following</span>
            </Link>
          </div>
          <div className="item">
            <Link to={"/user-post"} style={{ textDecoration: "none" }}>
              <img src={Gallery} alt="" />
              <span>Your Post</span>
            </Link>
          </div>
          <div className="item">
            <Link to={"/Search"} style={{ textDecoration: "none" }}>
              <img src={SearchImg} alt="" />
              <span>Search user</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
