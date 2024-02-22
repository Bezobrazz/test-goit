import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserCard from "./components/UserCard/UserCard";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";

const BASE_URL = "https://65d4fa523f1ab8c634366212.mockapi.io/users";

function App() {
  const [followers, setFollowers] = useState({});
  const [isActive, setIsActive] = useState({});
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

  useEffect(() => {
    const storedIsActive = JSON.parse(localStorage.getItem("isActive")) || {};
    setIsActive(storedIsActive);
  }, []);

  const handleClickActive = async (id) => {
    const newIsActive = { ...isActive, [id]: !isActive[id] };
    setIsActive(newIsActive);

    setFollowers((prevFollowers) => ({
      ...prevFollowers,
      [id]: newIsActive[id] ? prevFollowers[id] + 1 : prevFollowers[id] - 1,
    }));

    const dataToSend = {
      id: id,
      followers: newIsActive[id] ? followers[id] + 1 : followers[id] - 1,
    };

    try {
      const response = await axios.put(`${BASE_URL}/${id}`, dataToSend);
      const message = newIsActive[id]
        ? `You are following ${response.data.user}`
        : `You unfollow ${response.data.user}`;
      toast(message);
    } catch (error) {
      console.error("Error sending data:", error);
    }

    localStorage.setItem("isActive", JSON.stringify(newIsActive));
  };

  return (
    <div className="container">
      <ToastContainer />
      <UserCard
        displayedUsers={displayedUsers}
        followers={followers}
        isActive={isActive}
        handleClickActive={handleClickActive}
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
