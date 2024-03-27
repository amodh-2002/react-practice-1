import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const PostPage = ({ posts, handleDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate(); // Integration of useNavigate hook
  const post = posts.find((post) => post.id.toString() === id);

  const handlePostDelete = (postId) => {
    handleDelete(postId); // Call the handleDelete function to delete the post
    navigate("/"); // Navigate back to the home page after successful deletion
  };

  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postbody">{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button className="editButton">Edit Post</button>
            </Link>
            <button
              className="deleteButton"
              onClick={() => handlePostDelete(post.id)}
            >
              Delete Post
            </button>
          </>
        )}
        {!post && (
          <>
            <h2>Page not found</h2>
            <p>Well that's disappointing</p>
            <p>
              <Link to="/">Visit Our Homepage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
