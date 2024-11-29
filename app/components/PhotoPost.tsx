import styles from "../../styles/PhotoPost.module.css";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

function PhotoPost(props: any) {
  //get the height of the component(300px is the width of the photo in window)
  const x = Math.floor((props.height / props.width) * 300 + 80);
  //define component end
  const height = {
    gridRowEnd: "span " + x,
  };

  return (
    <div className={styles.photoPost} style={height}>
      <div className={styles.postContent}>
        <img className={styles.postImage} src={props.postImage} alt="random" />
        <div className={styles.like}>
          <div className={styles.likeButton}>
            <FaRegHeart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoPost;
