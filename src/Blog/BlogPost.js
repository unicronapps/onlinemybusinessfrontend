// src/pages/BlogPost.js
import React from "react";
import { useParams } from "react-router-dom";
import SEO from "./SEO";
import { posts } from "./BlogList";
import HowToStartBusinessPart1 from "./Blog1";
import HowToStartBusinessPart2 from "./Blog2";
import ChooseRightOnlineBusiness from "./Blog3";
import { Helmet } from "react-helmet";
import Header from "../components/Header";

const BlogPost = () => {
  const { slug } = useParams();
  console.log(slug);
  const posts = [
    {
      id: 1,
      title: "Post One",
      slug: "start-business-online-in-india-part-1",
      component: <HowToStartBusinessPart1 />,
      description: "Stating a Business Online in India: Step By Step Part-1",
      keywords:
        "Business Online India, online business, digital marketing, small business tips, SEO, website management",
    },
    {
      id: 2,
      title: "Stating a Business Online in India: Step By Step Part-2",
      slug: "start-business-online-in-india-part-2",
      component: <HowToStartBusinessPart2 />,
      description: "Stating a Business Online in India: Step By Step",
      keywords:
        "Business Online India, online business, digital marketing, small business tips, SEO, website management",
    },
    {
      id: 3,
      title: "Choosing the Right Online Business Idea in India",
      slug: "choosing-the-right-online-business-idea-in-india",
      component: <ChooseRightOnlineBusiness />,
      description: "Choosing the Right Online Business Idea in India",
      keywords:
        "Business Online India, online business, digital marketing, small business tips, SEO, website management",
    },
  ];

  const post = posts.find((p) => {
    console.log(p.slug, slug);
    return p.slug === slug;
  });

  console.log(post);
  return (
    <div>
      {/* <SEO
        title={post.title}
        description={postData.description}
        keywords={postData.keywords}
      /> */}
      <Helmet>
        <title>{post.title}</title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.keywords} />
        <link
          rel="canonical"
          href={`https://onlinemybusiness.com/blog/${post.slug}`}
        />
      </Helmet>
      <Header />
      {post.component}
    </div>
  );
};

export default BlogPost;
