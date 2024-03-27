import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./Components/Home.jsx";
import NewPost from "./Components/NewPost.jsx";
import PostPage from "./Components/PostPage.jsx";
import About from "./Components/About.jsx";
import Missing from "./Components/Missing.jsx";
import RootLayout from "./layouts/RootLayout.jsx";
import api from "./api/post.js";
import { format } from "date-fns";
import EditPost from "./Components/EditPost.jsx";
import useAxiosFetch from "./hooks/useAxiosFetch.js";

function App() {
  const [posts, setPosts] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  useEffect(() => {
    setPosts(data);
  }, [data]);

  const handleSubmit = async () => {
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd ,yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.post("/posts", newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts); // Update the posts state with the new data
      setPostTitle("");
      setPostBody("");
    } catch (error) {
      console.log(`Error ${error.message}`);
    }
  };

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd ,yyyy pp");
    const updatePost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`posts/${id}`, updatePost);
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditTitle("");
      setEditBody("");
    } catch (error) {
      console.log(`Error ${error.message}`);
    }
  };

  async function handleDelete(id) {
    try {
      await api.delete(`/posts/${id}`);
      const postList = posts.filter((post) => post.id !== id);
      setPosts(postList);
    } catch (error) {
      console.log(`Error ${error.message}`);
    }
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<RootLayout posts={posts} setSearchResult={setSearchResult} />}
      >
        <Route
          index
          element={
            <Home
              posts={searchResult}
              fetchError={fetchError}
              isLoading={isLoading}
            />
          }
        />
        <Route path="about" element={<About />} />
        <Route
          path="post"
          element={
            <NewPost
              postTitle={postTitle}
              postBody={postBody}
              setPostTitle={setPostTitle}
              setPostBody={setPostBody}
              handleSubmit={handleSubmit}
            />
          }
        />
        <Route
          path="edit/:id"
          element={
            <EditPost
              posts={posts}
              editTitle={editTitle}
              editBody={editBody}
              setEditTitle={setEditTitle}
              setEditBody={setEditBody}
              handleEdit={handleEdit}
            />
          }
        />
        <Route
          path="post/:id"
          element={<PostPage posts={posts} handleDelete={handleDelete} />}
        />
        <Route path="*" element={<Missing />} />
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
