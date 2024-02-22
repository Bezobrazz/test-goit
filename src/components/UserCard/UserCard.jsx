import axios from "axios";
import { nanoid } from "nanoid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import s from "./UserCard.module.css";
import logo from "../../assets/logo-goit.png";
import mainImg from "../../assets/main-img.png";
import defaultAvatar from "../../assets/default-avatar.jpg";

const UserCard = ({ displayedUsers, followers, setFollowers, BASE_URL }) => {
  const [isActive, setIsActive] = useState({});

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
        : `You unfollowed ${response.data.user}`;
      toast(message);
    } catch (error) {
      console.error("Error sending data:", error);
    }

    localStorage.setItem("isActive", JSON.stringify(newIsActive));
  };

  useEffect(() => {
    const storedIsActive = JSON.parse(localStorage.getItem("isActive")) || {};
    setIsActive(storedIsActive);
  }, []);

  const formatFollowers = (count) => {
    return count >= 10000 ? count.toLocaleString("en-US") : count;
  };
  return (
    <div className={s.userCardWrapper}>
      <ToastContainer />
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
  );
};

export default UserCard;
