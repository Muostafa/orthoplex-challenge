"use client";
import { useState, useEffect } from "react";
import PhotoPost from "./PhotoPost";
import styles from "../../styles/PhotoWall.module.css";
import Loader from "./Loader";

let postsBatchNum = 4;
function PhotoWall({ posts, setPosts }: { posts: any; setPosts: any }) {
  //all the current posts with the required info
  const [postsList, setPostsList] = useState([]);
  //determines if the loading should appear on the button
  const [isLoading, setIsLoading] = useState(true);

  //fetch 7 photos from the picsum api and add them to posts
  const getFetchPhotos = () => {
    setIsLoading(true);
    fetch(`https://picsum.photos/v2/list?page=${postsBatchNum}&limit=7`)
      .then((res) => res.json())
      .then((result) => {
        setPosts((oldPosts: any) => oldPosts.concat(result));
        postsBatchNum++;
      })
      .then(() => {})
      .catch(console.log);
  };

  useEffect(() => {
    getFetchPhotos();
  }, []);

  //update postsLists that should appear on window
  useEffect(() => {
    //make sure there are unique photos even if they are sent again by the api
    const uniqueIds: any[] = [];
    const uniquePosts = posts.filter((post: any) => {
      const isDuplicate = uniqueIds.includes(post.id);

      if (!isDuplicate) {
        uniqueIds.push(post.id);
        return true;
      }

      return false;
    });

    //create PhotoPost elements
    setPostsList(
      uniquePosts.map((post: any) => (
        <PhotoPost
          key={post.id}
          id={post.id}
          userName={post.author}
          postImage={post.download_url}
          width={post.width}
          height={post.height}
          notes={Math.floor(Math.random() * 100)}
        />
      ))
    );
    setIsLoading(false);
  }, [posts]);

  return (
    <div className={styles.container}>
      <div className={styles.photoWall}>{postsList}</div>
      {!isLoading ? (
        <button
          className={styles.button}
          onClick={getFetchPhotos}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Load more photos"}
        </button>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default PhotoWall;
