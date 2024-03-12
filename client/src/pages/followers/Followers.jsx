import { useContext, useState } from "react";
import LeftBar from "../../components/leftBar/LeftBar";
import { DarkModeContext } from "../../context/darkModeContext";
import "./Followes.scss";
import { AuthContext } from "../../context/authContext";
import useMakeRequest from "../../hook/useFetch";
import Spinner from "../../components/spinner/Spinner";
import { useQuery } from "@tanstack/react-query";
import profilePic from "../../assets/profilePic.png";
import FollowBtn from "../../components/follow/FollowBtn";
const Followers = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const [serachName, setSerachName] = useState(null);
  const makeRequest = useMakeRequest();
  const { isLoading: r2IsLoading, data: followeData } = useQuery(
    ["relationship2"],
    () =>
      makeRequest
        .get(
          "/relationships/followers/withdata?followedUsername=" +
            currentUser.username
        )
        .then((res) => {
          return res.data;
        })
  );

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

  return (
    <div className="f-main-container">
      <div className="list-container">
        <div className="serach-in-follower">
          <label htmlFor="serachF">search user who follow you</label>
          <input
            type="text"
            id="serachF"
            name="serachF"
            placeholder="enter name"
            onChange={(e) => setSerachName(e.target.value)}
          />
        </div>
        {r2IsLoading || rIsLoading ? (
          <Spinner />
        ) : (
          <ul className="list">
            {serachName ? (
              followeData.filter((friend) =>
                friend.name.toLowerCase().includes(serachName.toLowerCase())
              ).length === 0 ? (
                <h3>no such user</h3>
              ) : (
                followeData
                  .filter((friend) =>
                    friend.name.toLowerCase().includes(serachName.toLowerCase())
                  )
                  .map((friend) => {
                    return (
                      <li className="list-item">
                        <div className="user">
                          <div className="userInfo">
                            <img
                              src={
                                friend.profilePic
                                  ? friend.profilePic
                                  : profilePic
                              }
                              alt="Image"
                            />
                            <span className="name">{friend.name}</span>
                            <span className="username">
                              &#40;{friend.followerUsername}&#41;
                            </span>
                          </div>
                          <div className="buttons">
                            <FollowBtn
                              relationshipData={relationshipData}
                              username={friend.followerUsername}
                            />
                            <button>Watch Post</button>
                          </div>
                        </div>
                      </li>
                    );
                  })
              )
            ) : (
              followeData.map((friend) => {
                return (
                  <li className="list-item">
                    <div className="user">
                      <div className="userInfo">
                        <img
                          src={
                            friend.profilePic ? friend.profilePic : profilePic
                          }
                          alt="Image"
                        />
                        <span className="name">{friend.name}</span>
                        <span className="username">
                          &#40;{friend.followerUsername}&#41;
                        </span>
                      </div>
                      <div className="buttons">
                        <FollowBtn
                          relationshipData={relationshipData}
                          username={friend.followerUsername}
                        />
                        <button>Watch Post</button>
                      </div>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        )}
      </div>
      <div className="post-container">yha post dal denge</div>
    </div>
  );
};

export default Followers;
