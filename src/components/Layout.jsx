import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <h1>User Tweets</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tweets">Tweets</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
