import s from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ setCurrentPage, displayedUsers, totalUsers }) => {
  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const disabledBtn = displayedUsers.length >= totalUsers;
  return (
    <>
      {displayedUsers.length > 0 && (
        <button
          className={`${s.btnLoadMore} ${disabledBtn ? s.btnDisabled : ""}`}
          onClick={handleLoadMore}
          disabled={disabledBtn}
        >
          Load More
        </button>
      )}
    </>
  );
};

export default LoadMoreBtn;
