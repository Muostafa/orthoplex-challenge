"use client";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import styles from "../../styles/Navbar.module.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <button className={styles.navItem} onClick={() => router.push("/")}>
            Home
          </button>
        </li>
        {!user ? (
          <li>
            <button
              className={styles.navItem}
              onClick={() => router.push("/login")}
            >
              Login
            </button>
          </li>
        ) : (
          <>
            <li>
              <button
                className={styles.navItem}
                onClick={() => router.push("/dashboard")}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button className={styles.navItem} onClick={logout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
