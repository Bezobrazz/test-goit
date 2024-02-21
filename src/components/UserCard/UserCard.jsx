import { useEffect, useState } from "react";
import s from "./UserCard.module.css";
import logo from "../../assets/logo-goit.png";
import mainImg from "../../assets/main-img.png";
import defaultAvatar from "../../assets/default-avatar.jpg";

const UserCard = ({ userData }) => {
  const [followers, setFollowers] = useState({});
  const [isActive, setIsActive] = useState({});

  useEffect(() => {
    const followersData = {};
    userData.forEach((user) => {
      followersData[user.id] = parseInt(user.followers, 10);
    });
    setFollowers(followersData);
  }, [userData]);

  const handleClickActive = (id) => {
    setIsActive((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));

    setFollowers((prevState) => ({
      ...prevState,
      [id]: isActive[id] ? prevState[id] - 1 : prevState[id] + 1,
    }));
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
