import React from "react";
import Header from "../Components/Header";
import Nav from "../Components/Nav";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";

const RootLayout = ({ posts, setSearchResult }) => {
  const [search, setSearch] = useState("");
  const { width } = useWindowSize();

  useEffect(() => {
    const filteredResutl = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResult(filteredResutl.reverse());
  }, [search, posts]);

  return (
    <div className="root-layout">
      <Header title="ReactJs Blog" width={width} />
      <Nav search={search} setSearch={setSearch} />
      <main>{<Outlet />}</main>
      <Footer />
    </div>
  );
};

export default RootLayout;
