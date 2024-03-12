import { useRef, useState } from "react";
import SearchResultsContainer from "../../components/comments/searchContainer/searchResultsContainer";
import useMakeRequest from "../../hook/useFetch";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import "./SearchPage.scss";

const SearchPage = () => {
  const makeRequest = useMakeRequest();
  const inputRef = useRef("");
  const [isSearch, setIsSearch] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = async () => {
    await makeRequest
      .post("/users/find", { username })
      .then((res) => setSearchResult(res.data))
      .catch((error) => {
        console.log("search Error");
        console.log(error.response.status);
        if (error.response.status === 404) {
          setSearchResult([]);
        }
        console.log(error);
      });
    setIsSearch(true);
  };
  const handleEnter = (e) => {
    if (e.key === "Enter" && inputRef.current.value.length > 0) {
      console.log("Enter pressed");
      handleSearch();
    }
  };
  return (
    <div>
      SearchPage
      <div className="search">
        <input
          type="text"
          placeholder="Search..."
          ref={inputRef}
          onKeyUp={handleEnter}
        />
        <button onClick={handleSearch}>
          <SearchOutlinedIcon />
        </button>
      </div>
      {isSearch && (
        <SearchResultsContainer data={searchResult} setIsSearch={setIsSearch} />
      )}
    </div>
  );
};

export default SearchPage;
