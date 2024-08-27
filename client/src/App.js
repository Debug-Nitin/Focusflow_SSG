import React from "react";
import PageTitle from "./Components/PageTitle";
import AppHeader from "./Components/AppHeader";
import AppContent from "./Components/AppContent";
import AppFooter from "./Components/AppFooter";
import styles from "./Styles/App.module.css";
import AppKey from "./Components/AppKey";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="Container">
      <Toaster />
      <PageTitle>Manage Your ToDos</PageTitle>
      <div className={styles.app__wrapper}></div>
      <AppHeader />
      <AppKey />
      <AppContent />
      <AppFooter />
    </div>
  );
}

export default App;
