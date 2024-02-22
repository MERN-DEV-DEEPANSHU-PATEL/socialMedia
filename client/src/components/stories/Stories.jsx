import { useContext } from "react";
import "./stories.scss";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import useMakeRequest from "../../hook/useFetch";
import { toast } from "react-toastify";
const Stories = () => {
  const { currentUser } = useContext(AuthContext);
  const makeRequest = useMakeRequest();

  const { isLoading, error, data } = useQuery(["stories"], () =>
    makeRequest.get("/stories").then((res) => {
      return res.data;
    })
  );

  const mutation = useMutation(
    (formData) => {
      return makeRequest.post("/stories", formData);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        toast.success("Story Uploaded");
        queryClient.invalidateQueries(["stories"]);
      },
    }
  );

  const handleUpload = (e) => {
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    mutation.mutate(formData);
  };

  //TODO Add story using react-query mutations and use upload function.
  console.log(data);
  return (
    <div className="stories">
      <div className="story">
        <img src={"/upload/" + currentUser.profilePic} alt="" />
        <span>{currentUser.name}</span>
        <label htmlFor="media">+</label>
        <input
          type="file"
          style={{ display: "none" }}
          name="media"
          id="media"
          onChange={(e) => handleUpload(e)}
        />
      </div>
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((story) => (
            <div className="story" key={story.ID}>
              <img src={`/stories/${story.media}`} alt="" />
              <span>{story.name}</span>
            </div>
          ))}
    </div>
  );
};

export default Stories;
