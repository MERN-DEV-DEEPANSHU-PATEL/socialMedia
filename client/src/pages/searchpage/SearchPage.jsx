import { useContext, useEffect, useState } from "react";
import LeftBar from "../../components/leftBar/LeftBar";
import { DarkModeContext } from "../../context/darkModeContext";
import "./SearchPage.scss";
import { AuthContext } from "../../context/authContext";
import useMakeRequest from "../../hook/useFetch";
import Spinner from "../../components/spinner/Spinner";
import { useQuery } from "@tanstack/react-query";
import profilePic from "../../assets/profilePic.png";
import FollowBtn from "../../components/follow/FollowBtn";
import { useLocation, useParams } from "react-router-dom";
const SearchPage = () => {
  const { currentUser } = useContext(AuthContext);
  const { username } = useParams();
  const [searchName, setSearchName] = useState(username);
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const makeRequest = useMakeRequest();

  const location = useLocation();

  const getSearchUser = async () => {
    try {
      setIsLoading(true);
      const { data } = await makeRequest.get(
        `users/find?username=${searchName}`
      );
      setdata(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearchUser();
  }, [searchName]);

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest
        .get(
          "/relationships/following/onlyusername?followerUsername=" +
            currentUser.username
        )
        .then((res) => {
          return res.data;
        })
  );

  console.log("search", data);
  return (
    <div className="search-container">
      <div className="list-container">
        <div
          style={{ display: location.pathname == "/search" ? "flex" : "none" }}
          className="serach-in-follower"
        >
          <label htmlFor="serachF">Search Any User</label>
          <input
            type="text"
            id="serachF"
            name="serachF"
            placeholder="enter name"
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>

        {!searchName ? (
          <h1>Search user now</h1>
        ) : isLoading || rIsLoading ? (
          <Spinner />
        ) : (
          <ul className="list">
            {data.map((friend) => {
              return (
                <li className="list-item">
                  <div className="user">
                    <div className="userInfo">
                      <img
                        src={
                          friend.profilePic
                            ? "/upload/" + friend.profilePic
                            : profilePic
                        }
                        alt="Image"
                      />
                      <span className="name">{friend.name}</span>
                      <span className="username">
                        &#40;{friend.username}&#41;
                      </span>
                    </div>
                    <div className="buttons">
                      <FollowBtn
                        relationshipData={relationshipData}
                        username={friend.username}
                      />
                      <button>Watch Post</button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="big-post-container">yha post dal denge</div>
    </div>
  );
};

export default SearchPage;
