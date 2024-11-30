"use client";
import { useState, useEffect } from "react";
import PhotoPost from "./PhotoPost";
import styles from "../../styles/PhotoWall.module.css";

function FavoritesWall({ posts }: { posts: any }) {
  const [postsList, setPostsList] = useState([]);

  //update postsLists that should appear on window
  useEffect(() => {
    setPostsList(
      posts.map((post: any) => (
        <PhotoPost
          key={post.id}
          id={post.id}
          userName={post.author}
          postImage={post.download_url}
          width={post.width}
          height={post.height}
        />
      ))
    );
  }, [posts]);

  return (
    <div className={styles.container}>
      <div className={styles.photoWall}>{postsList}</div>
    </div>
  );
}

export default FavoritesWall;
