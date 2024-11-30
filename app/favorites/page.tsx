"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import styles from "../../styles/Dashboard.module.css";
import FavoritesWall from "../components/FavoritesWall";

export default function Dashboard() {
  const { user, token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // To show a loading spinner until the data is fetched

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          // Fetch user's favorite photo IDs
          const response = await fetch("/api/user/favoritePhotos", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Use the token you have stored in context
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch favorite photos");
          }

          const data = await response.json();
          const favoriteIds = data.favoritePhotos;

          // Fetch information for each favorite photo
          const fetchPhotos = favoriteIds.map(async (id: number) => {
            const photoResponse = await fetch(
              `https://picsum.photos/id/${id}/info`
            );
            if (!photoResponse.ok) {
              throw new Error(`Failed to fetch photo with ID: ${id}`);
            }
            return await photoResponse.json();
          });

          // Wait for all photo data to be fetched
          const photoData: any = await Promise.all(fetchPhotos);

          setPosts(photoData); // Set the fetched posts in state
        } catch (err) {
          console.error("Error fetching favorite photos:", err);
        } finally {
          setLoading(false); // Stop loading after fetching all data or error
        }
      }
    };

    fetchData();
  }, [user]);

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

  if (loading) {
    return (
      <div className={styles.container}>
        <p className={styles.loadingMessage}>Loading your favorite photos...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.welcomeMessage}>Welcome, {user.username}!</h1>
      <FavoritesWall posts={posts} setPosts={setPosts} />
    </div>
  );
}
