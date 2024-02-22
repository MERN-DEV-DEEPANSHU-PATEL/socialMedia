import React, { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";
import useMakeRequest from "../../hook/useFetch";

const FollowBtn = ({ username, relationshipData, isSearch = false }) => {
  const queryClient = useQueryClient();
  const { currentUser } = useContext(AuthContext);
  const makeRequest = useMakeRequest();
  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationships?username=" + username);
      return makeRequest.post("/relationships", { username });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  console.log(relationshipData);
  console.log(username);
  console.log(relationshipData.includes(username));
  const followerId = !isSearch ? currentUser.username : username;
  const handleFollow = (e) => {
    e.stopPropagation();
    e.preventDefault();
    mutation.mutate(relationshipData.includes(followerId));
  };

  return (
    <button
      onClick={handleFollow}
      disabled={isSearch}
      style={{ cursor: isSearch ? "not-allowed" : "pointer" }}
    >
      {relationshipData.includes(followerId) ? "Following" : "Follow"}
    </button>
  );
};

export default FollowBtn;
