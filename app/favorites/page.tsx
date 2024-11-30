"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import styles from "../../styles/Dashboard.module.css";
import FavoritesWall from "../components/FavoritesWall";
import { useFavorites } from "../../context/FavoritesContext";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const { favorites, loading } = useFavorites();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPhotoDetails = async () => {
      if (favorites.length > 0) {
        try {
          const fetchPhotos = favorites.map(async (id: number) => {
            const photoResponse = await fetch(
              `https://picsum.photos/id/${id}/info`
            );
            if (!photoResponse.ok) {
              throw new Error(`Failed to fetch photo with ID: ${id}`);
            }
            return await photoResponse.json();
          });

          const photoData: any = await Promise.all(fetchPhotos);
          setPosts(photoData);
        } catch (err) {
          console.error("Error fetching photo details:", err);
        }
      } else {
        setPosts([]);
      }
    };

    fetchPhotoDetails();
  }, [favorites]);

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

  if (favorites.length === 0)
    return (
      <div className={styles.container}>
        <h1 className={styles.welcomeMessage}>Welcome, {user.username}!</h1>
        <h3>
          Go to{" "}
          <strong>
            <span
              className={styles.link}
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </span>
          </strong>{" "}
          and like some photos to view them
        </h3>
      </div>
    );

  return (
    <div className={styles.container}>
      <h1 className={styles.welcomeMessage}>Welcome, {user.username}!</h1>
      <FavoritesWall posts={posts} />
    </div>
  );
}
