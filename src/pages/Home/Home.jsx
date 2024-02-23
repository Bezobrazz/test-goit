import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import s from "./Home.module.css";

const Home = () => {
  return (
    <div className={s.homeWrapper}>
      <h1 className={s.mainTitle}>Welcome to Tweets!</h1>
      <Link className={s.homeBtn} to="/tweets">
        to tweets! {<AiOutlineArrowRight className={s.arrowIcon} />}
      </Link>
    </div>
  );
};

export default Home;
