import React from "react";
import { useNavigate } from "react-router-dom";

const NewPost = ({
  handleSubmit,
  postTitle,
  setPostTitle,
  postBody,
  setPostBody,
}) => {
  const navigate = useNavigate();

  // NewPost component
  const handleSubmitClick = (e) => {
    e.preventDefault(); // Prevent the default form submission
    handleSubmit(); // Call the handleSubmit function to add the new data
    navigate("/"); // Navigate to the main page
  };

  return (
    <main className="newPost">
      <h2>New Post</h2>
      <form action="" className="newPostForm" onSubmit={handleSubmitClick}>
        <label htmlFor="postTitle">Title : </label>
        <input
          type="text"
          id="postTitle"
          required
          placeholder="Enter Title"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Body : </label>
        <textarea
          type="text"
          id="postTitle"
          required
          placeholder="Enter Title"
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
