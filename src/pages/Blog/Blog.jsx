import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import { useBlog } from '../../context';

import './Blog.css';
import { useAuth, roles } from '../../hooks';

function BlockPreview({ children }) {
  return <div>{children}</div>;
}

function Blog() {
  const { user } = useAuth();
  const { blogs } = useBlog();
  const navigate = useNavigate();

  const handleNewBlog = () => {
    navigate('/blog/new');
  };

  return (
    <div>
      <header>
        <h2>Blogs</h2>
        {user && [roles.ADMIN, roles.EDITOR].includes(user.role) && (
          <button onClick={handleNewBlog}>Nuevo Blog</button>
        )}
      </header>
      <main className="blog-container">
        {blogs.length ? (
          blogs.map(({ slug, title, id }) => (
            <BlockPreview key={id}>
              <Link to={slug}>{title}</Link>
            </BlockPreview>
          ))
        ) : (
          <p>No hay blogs</p>
        )}

        <Outlet />
      </main>
    </div>
  );
}

export { Blog };
