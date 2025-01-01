// src/pages/BlogList.js
import React from "react";
import { Link } from "react-router-dom";
import SEO from "./SEO";
export const posts = [
  { id: 1, title: "Post One", slug: "post-one" },
  { id: 2, title: "Post Two", slug: "post-two" },
];
const BlogList = () => {
  return (
    <div>
      <SEO
        title="Blog - My Website"
        description="Discover articles about various topics on our blog."
        keywords="blog, articles, topics"
      />
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
