import s from "./UserCard.module.css";
import { nanoid } from "nanoid";
import logo from "../../assets/logo-goit.png";
import mainImg from "../../assets/main-img.png";
import defaultAvatar from "../../assets/default-avatar.jpg";

const UserCard = ({
  displayedUsers,
  handleClickActive,
  followers,
  isActive,
}) => {
  const formatFollowers = (count) => {
    return count >= 10000 ? count.toLocaleString("en-US") : count;
  };
  return (
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
  );
};

export default UserCard;
