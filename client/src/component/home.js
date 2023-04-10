import React, { useState } from "react";
import axios from "axios";
import styles from "./styles/home.module.css";

axios.defaults.withCredentials = true;
function Home() {
  const [state, setState] = useState({
    value: "Private Protected Route - Home",
  });

  const logout = () => {
    axios
      .get("http://Localhost:4000/logout")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
    window.location.reload();
  };
  return (
    <div>
      <div>
        <h2>Welcome </h2>
        <p>Thanku for signing in</p>
      </div>
      <div>
        <button onClick={logout} className={styles.logout}>
          Log out
        </button>

        <div />
        <div></div>
      </div>
    </div>
  );
}

export default Home;
