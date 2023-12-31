import "./post.css";
import { FiMoreVertical } from "react-icons/fi";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = 'http://localhost:3000/assets';

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users/?userId=${post.userId}`);
        setUser(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [post.userId]);

  useEffect(() => {
    setIsLiked(post.likes.includes(user._id));
  }, [post.likes, user._id]);

  const likeHandler = async () => {
    try {
      await axios.put(`http://localhost:8800/api/posts/${post._id}/like`, { userId: user._id });
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="post">
    <div className="postWrapper">
      <div className="postTop">
        <div className="postTopLeft">
          <Link to={`profile/${user.username}`}>
          <img
            className="postProfileImg"
            src={user.profilePicture ? `${PF}/${user.profilePicture}` : `${PF}/person/noAvatar.png`}
            alt=""
          />
          </Link>
          <span className="postUsername">
            {user.username}
          </span>
          <span className="postDate">{format(post.createdAt)}</span>
        </div>
        <div className="postTopRight">
          <FiMoreVertical />
        </div>
      </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={ `${PF}/${post.img}`} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="/assets/like.png" onClick={likeHandler} alt="" />
            <img className="likeIcon" src="/assets/heart.png" onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
