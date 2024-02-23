import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to tweets!</h1>
      <Link to="/tweets">to tweets!</Link>
    </div>
  );
};

export default Home;
