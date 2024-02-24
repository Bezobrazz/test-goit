import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Tweets from "./pages/Tweets/Tweets";

const BASE_URL = "https://65d4fa523f1ab8c634366212.mockapi.io/users";

function App() {
  const [followers, setFollowers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);
  const [filter, setFilter] = useState("show all");

  let usersPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalUsers = await axios.get(BASE_URL);
        setTotalUsers(totalUsers.data.length);

        const response = await axios.get(
          `${BASE_URL}?page=${currentPage}&limit=${usersPerPage}`
        );

        const newFollowers = {};
        response.data.forEach((user) => {
          newFollowers[user.id] = parseInt(user.followers, 10);
        });
        setFollowers((prevFollowers) => ({
          ...prevFollowers,
          ...newFollowers,
        }));
        if (currentPage === 1) {
          setDisplayedUsers(response.data);
        } else {
          setDisplayedUsers((prevDisplayedUsers) => [
            ...prevDisplayedUsers,
            ...response.data,
          ]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, usersPerPage]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="container">
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route
          path="/tweets"
          element={
            <Tweets
              displayedUsers={displayedUsers}
              followers={followers}
              setFollowers={setFollowers}
              BASE_URL={BASE_URL}
              totalUsers={totalUsers}
              setCurrentPage={setCurrentPage}
              handleFilterChange={handleFilterChange}
              filter={filter}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
