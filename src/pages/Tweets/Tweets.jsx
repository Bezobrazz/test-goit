/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import s from "./Tweets.module.css";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import UserCard from "../../components/UserCard/UserCard";
import Filter from "../../components/Filter/Filter";

const Tweets = ({
  displayedUsers,
  followers,
  setFollowers,
  BASE_URL,
  totalUsers,
  setCurrentPage,
  handleFilterChange,
  filter,
}) => {
  return (
    <div>
      <div className={s.filterWrapper}>
        <Link className={s.backBtn} to="/">
          Back
        </Link>
        <Filter handleFilterChange={handleFilterChange} filter={filter} />
      </div>

      <UserCard
        displayedUsers={displayedUsers}
        followers={followers}
        setFollowers={setFollowers}
        BASE_URL={BASE_URL}
        filter={filter}
      />
      <LoadMoreBtn
        totalUsers={totalUsers}
        displayedUsers={displayedUsers}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Tweets;
