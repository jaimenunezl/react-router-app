import { createContext, useContext, useState } from 'react';

import * as slugify from 'slugify';

const BlogContext = createContext();

function BlogProvider({ children }) {
  const [blogs, setBlogs] = useState([]);

  const addBlog = ({ title, content, user }) => {
    setBlogs([
      ...blogs,
      { id: crypto.randomUUID(), user, title, content, slug: slugify(title) },
    ]);
  };

  const deleteBlog = (id) => {
    const newList = blogs.filter((blog) => blog.id !== id);
    setBlogs(newList);
  };

  const editBlog = ({ id, title, content }) => {
    const newList = blogs.map((blog) => {
      if (blog.id !== id) return blog;

      return { ...blog, title, content, slug: slugify(title) };
    });

    setBlogs(newList);
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog, deleteBlog, editBlog }}>
      {children}
    </BlogContext.Provider>
  );
}

const useBlog = () => {
  return useContext(BlogContext);
};

export { useBlog, BlogProvider };
