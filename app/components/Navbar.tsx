"use client";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import styles from "../../styles/Navbar.module.css";
import { IoMdHome } from "react-icons/io";
import { IoLogIn } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <button className={styles.navItem} onClick={() => router.push("/")}>
            <div className={styles.icon}>
              <IoMdHome />
              <p className={styles.desktop}>Home</p>
            </div>
          </button>
        </li>
        {!user ? (
          <li>
            <button
              className={styles.navItem}
              onClick={() => router.push("/login")}
            >
              <div className={styles.icon}>
                <IoLogIn />
                <p className={styles.desktop}>Login</p>
              </div>
            </button>
          </li>
        ) : (
          <>
            <li>
              <button
                className={styles.navItem}
                onClick={() => router.push("/dashboard")}
              >
                <div className={styles.icon}>
                  <MdDashboard />
                  <p className={styles.desktop}>Dashboard</p>
                </div>
              </button>
            </li>
            <li>
              <button className={styles.navItem} onClick={logout}>
                <div className={styles.icon}>
                  <IoLogOut />
                  <p className={styles.desktop}>Logout</p>
                </div>
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
