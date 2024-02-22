import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "./UserCard.module.css";
import logo from "../../assets/logo-goit.png";
import mainImg from "../../assets/main-img.png";
import defaultAvatar from "../../assets/default-avatar.jpg";

const UserCard = ({ userData, BASE_URL }) => {
  const [followers, setFollowers] = useState({});
  const [isActive, setIsActive] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const usersPerPage = 3; // Кількість користувачів на сторінці
  const [loading, setLoading] = useState(false);
  const [displayedUsers, setDisplayedUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, [currentPage]); // Перезавантаження даних при зміні поточної сторінки

  useEffect(() => {
    const storedIsActive = JSON.parse(localStorage.getItem("isActive")) || {};
    setIsActive(storedIsActive);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}?page=${currentPage}&limit=${usersPerPage}`
      );
      setTotalPages(response.headers["x-total-pages"]);
      const newFollowers = {};
      response.data.forEach((user) => {
        newFollowers[user.id] = parseInt(user.followers, 10);
      });
      setFollowers((prevFollowers) => ({ ...prevFollowers, ...newFollowers }));

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
    if (count >= 10000) {
      return count.toLocaleString("en-US");
    } else {
      return count;
    }
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <ToastContainer />

      {displayedUsers.map((user) => (
        <div className={s.userCard} key={user.id}>
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

      <button className={s.btnLoadMore} onClick={handleLoadMore}>
        Load More
      </button>
    </>
  );
};

export default UserCard;
