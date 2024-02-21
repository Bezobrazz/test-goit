/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "./UserCard.module.css";
import logo from "../../assets/logo-goit.png";
import mainImg from "../../assets/main-img.png";
import defaultAvatar from "../../assets/default-avatar.jpg";
import axios from "axios";

const UserCard = ({ userData, BASE_URL }) => {
  const [followers, setFollowers] = useState({});
  const [isActive, setIsActive] = useState({});

  useEffect(() => {
    const followersData = {};
    userData.forEach((user) => {
      followersData[user.id] = parseInt(user.followers, 10);
    });
    setFollowers(followersData);
  }, [userData]);

  useEffect(() => {
    const storedIsActive = JSON.parse(localStorage.getItem("isActive")) || {};
    setIsActive(storedIsActive);
  }, []);

  const handleClickActive = async (id) => {
    const newIsActive = { ...isActive, [id]: !isActive[id] };

    setIsActive(newIsActive);

    setFollowers((prevState) => ({
      ...prevState,
      [id]: newIsActive[id] ? prevState[id] + 1 : prevState[id] - 1,
    }));

    const dataToSend = {
      id: id,
      followers: isActive[id] ? followers[id] - 1 : followers[id] + 1,
    };

    try {
      const response = await axios.put(`${BASE_URL}/${id}`, dataToSend);
      !isActive[id]
        ? toast(`You are folowing ${response.data.user}`)
        : toast(`You unfollow ${response.data.user}`);
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

  return (
    <>
      <ToastContainer />
      {userData.map((user) => (
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
    </>
  );
};

export default UserCard;
