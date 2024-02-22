import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { nanoid } from "nanoid";
import s from "./App.module.css";
import logo from "./assets/logo-goit.png";
import mainImg from "./assets/main-img.png";
import defaultAvatar from "./assets/default-avatar.jpg";

const BASE_URL = "https://65d4fa523f1ab8c634366212.mockapi.io/users";

function App() {
  const [followers, setFollowers] = useState({});
  const [isActive, setIsActive] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const usersPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
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

    const storedPage = localStorage.getItem("currentPage");
    if (storedPage) {
      setCurrentPage(parseInt(storedPage, 10));
    }
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

  const formatFollowers = (count) => {
    return count >= 10000 ? count.toLocaleString("en-US") : count;
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => {
      localStorage.setItem("currentPage", prevPage + 1);
      return prevPage + 1;
    });
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className={s.userCardWrapper}>
        {displayedUsers.map((user) => (
          <div className={s.userCard} key={nanoid()}>
            <img className={s.logo} src={logo} alt="logo" />
            <img className={s.mainImg} src={mainImg} alt="image" />
            <div className={s.avatarBone}></div>
            <div className={s.avatarImgWrapper}>
              <img
                className={s.avatarImg}
                src={user.avatar ? user.avatar : defaultAvatar}
                alt="user avatar"
              />
            </div>
            <div className={s.informWrapper}>
              <p className={s.userName}>{user.user}</p>
              <p className={s.informTweets}>{user.tweets} tweets</p>
              <p className={s.informFollowers}>
                {followers[user.id] && formatFollowers(followers[user.id])}{" "}
                Followers
              </p>
              <button
                className={isActive[user.id] ? s.followBtnActive : s.followBtn}
                onClick={() => handleClickActive(user.id)}
              >
                {isActive[user.id] ? "Following" : "Follow"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className={s.btnLoadMore} onClick={handleLoadMore}>
        Load More
      </button>
    </div>
  );
}

export default App;
