"use client";
import styles from "../../styles/PostContent.module.css";

function PostContent({ postImage }: any) {
  return (
    <div className={styles.postContent}>
      <img className={styles.postImage} src={postImage} alt="random" />
    </div>
  );
}

export default PostContent;
