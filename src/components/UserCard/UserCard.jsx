import s from "./UserCard.module.css";
import logo from "../../assets/logo-goit.png";
import mainImg from "../../assets/main-img.png";
import defaultAvatar from "../../assets/default-avatar.jpg";

const UserCard = () => {
  return (
    <div className={s.userCard}>
      <img className={s.logo} src={logo} alt="logo" />
      <img className={s.mainImg} src={mainImg} alt="main image" />
      <div className={s.avatarBone}></div>
      <div className={s.avatarImgWrapper}>
        <img className={s.avatarImg} src={defaultAvatar} alt="" />
      </div>
      <div className={s.informWrapper}>
        <p className={s.informTweets}>777 tweets</p>
        <p className={s.informFollowers}>100,501 Followers</p>
        <button className={s.followBtn}>Follow</button>
      </div>
    </div>
  );
};

export default UserCard;
