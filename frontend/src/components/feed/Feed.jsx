import Post from "../post/Post";
import Share from "../share/Share";
import {useState,useEffect} from "react";
import "./feed.css";
import axios from "axios";
export default function Feed({username}) {
  const[posts,setPosts] = useState([]);
  useEffect(()=>{
    const fetchPosts = async () => {
      try {
        const res = username
          ? await axios.get(`/posts/profile/${username}`)
          : await axios.get("/posts/timeline/64d6b055cbf1c010781e68b0");
        console.log("Response:", res.data); // Log response data for debugging
        setPosts(res.data);
      } catch (error) {
        console.error("Error:", error); // Log any errors for debugging
      }
    };
    fetchPosts();
  
  },[username]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
