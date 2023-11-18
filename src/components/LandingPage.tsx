import React, { useEffect, useState } from "react";
import axios from "axios";

interface Author {
  _id: string;
  username: string;
}

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: Author;
  averageRating: number;
}

const LandingPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get<{ Message: string; data: Blog[] }>("http://localhost:3000/blogs/")
      .then(response => {
        setBlogs(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching blogs", error);
      });
  }, []);

  return (
    <div>
      {blogs.map(blog => (
        <div
          key={blog._id}
          style={{ border: "1px solid #ddd", margin: "20px", padding: "20px" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 style={{ margin: "0 0 10px 0" }}>{blog.title}</h2>
            <p>{blog.averageRating}⭐</p>
          </div>
          <p style={{ color: "#888", margin: "0 0 10px 0" }}>
            By {blog.author.username}
          </p>
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  );
};

export default LandingPage;
