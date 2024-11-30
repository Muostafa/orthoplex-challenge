"use client";
import { useState, useEffect } from "react";
import styles from "../../styles/PhotoPost.module.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "../../context/FavoritesContext";
import Loader from "./Loader";
function PhotoPost({ id, postImage, width, height }: any) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const x = Math.floor((height / width) * 300 + 80);
  const gridHeight = {
    gridRowEnd: "span " + x,
  };

  useEffect(() => {
    setLiked(favorites.includes(Number(id)));
  }, [favorites, id]);

  const handleLikeToggle = async () => {
    setLoading(true);
    if (liked) {
      await removeFavorite(id); // Remove from favorites
    } else {
      await addFavorite(id); // Add to favorites
    }
    setLoading(false);
    setLiked((prev) => !prev);
  };

  return (
    <div className={styles.photoPost} style={gridHeight}>
      <div className={styles.postContent}>
        <img className={styles.postImage} src={postImage} alt="random" />
        <div className={styles.like}>
          <div className={styles.likeButton} onClick={handleLikeToggle}>
            {loading && <Loader />}
            {liked ? !loading && <FaHeart /> : !loading && <FaRegHeart />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoPost;
