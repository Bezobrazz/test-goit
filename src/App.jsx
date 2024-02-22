import axios from "axios";
import { useState, useEffect } from "react";

import UserCard from "./components/UserCard/UserCard";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";

const BASE_URL = "https://65d4fa523f1ab8c634366212.mockapi.io/users";

function App() {
  const [followers, setFollowers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);

  const usersPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  return (
    <div className="container">
      <UserCard
        displayedUsers={displayedUsers}
        followers={followers}
        setFollowers={setFollowers}
        BASE_URL={BASE_URL}
      />
      <LoadMoreBtn
        totalUsers={totalUsers}
        displayedUsers={displayedUsers}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
