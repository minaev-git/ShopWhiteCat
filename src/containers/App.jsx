import React from "react";
import Main from "./Main";
import Header from "./Header";
import styles from "./styles/App.css";


const App = () => (
  <div className={`container ${styles.mainFrame}`}>
    <Header />
    <Main />
  </div>
);

export default App;
