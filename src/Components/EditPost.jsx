import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const EditPost = ({
  posts,
  handleEdit,
  editBody,
  setEditBody,
  editTitle,
  setEditTitle,
}) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  useEffect(() => {
    if (post) {
      setEditBody(post.body);
      setEditTitle(post.title);
    }
  }, [post, setEditBody, setEditTitle]);

  const navigate = useNavigate();

  // NewPost component
  const handleEditClick = (e) => {
    e.preventDefault(); // Prevent the default form submission
    handleEdit(post.id); // Call the handleSubmit function to add the new data
    navigate("/"); // Navigate to the main page
  };

  return (
    <main className="newPost">
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form
            action=""
            className="newPostForm"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="postTitle">Title : </label>
            <input
              type="text"
              id="postTitle"
              required
              placeholder="Enter Title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody">Body : </label>
            <textarea
              type="text"
              id="postTitle"
              required
              placeholder="Enter Title"
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="submit" onClick={handleEditClick}>
              Submit
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Page not found</h2>
          <p>Well that's disappointing</p>
          <p>
            <Link to="/">Visit Our Homepage</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default EditPost;
