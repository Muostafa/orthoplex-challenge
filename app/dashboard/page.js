"use client";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import styles from "../../styles/Dashboard.module.css";
import PhotoWall from "../components/PhotoWall";

export default function Dashboard() {
  const { user } = useAuth();

  const [posts, setPosts] = useState([]);
  const [postsBatchNum, setPostsBatchNum] = useState(1);

  if (!user) {
    return (
      <div className={styles.container}>
        <p className={styles.notLoggedInMessage}>You are not logged in.</p>
        <Link href="/login" className={styles.loginLink}>
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.welcomeMessage}>Welcome, {user.username}!</h1>
      <PhotoWall
        posts={posts}
        setPosts={setPosts}
        postsBatchNum={postsBatchNum}
        setPostsBatchNum={setPostsBatchNum}
      />
    </div>
  );
}
