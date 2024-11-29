"use client";
import styles from "../../styles/Loader.module.css"; // Import the CSS module for the loader

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loader;
