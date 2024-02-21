import { useState, useEffect } from "react";
import UserCard from "./components/UserCard/UserCard";
import axios from "axios";

const BASE_URL = "https://65d4fa523f1ab8c634366212.mockapi.io/users";

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BASE_URL);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      {userData && <UserCard userData={userData} />}
    </div>
  );
}

export default App;
