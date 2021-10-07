import React from "react"
import Layout from "../components/Layout"
import Post from "../components/Post"
import { useQuery } from "@apollo/client";
import { GET_POSTS } from '../querys'

const Blog: React.FC = () => {
  const { loading, error, data } = useQuery(GET_POSTS);
    if (loading) return <>Loading...</>;
    if (error) return <>{`Error! ${error.message}`}</>;
  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {data.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Blog
