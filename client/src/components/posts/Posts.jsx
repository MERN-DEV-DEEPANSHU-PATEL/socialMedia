import { useContext } from "react";
import useMakeRequest from "../../hook/useFetch";
import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";

const Posts = () => {
  const { currentUser } = useContext(AuthContext);
  const makeRequest = useMakeRequest();
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get(`/posts?username=${currentUser.username}`).then((res) => {
      return res.data;
    })
  );
  return (
    <div className="posts">
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((post) => <Post post={post} key={post.ID} />)}
    </div>
  );
};

export default Posts;
