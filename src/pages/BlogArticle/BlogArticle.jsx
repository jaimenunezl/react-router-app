import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthPermission, useAuth } from '../../hooks';
import { useBlog } from '../../context';

function BlogArticle() {
  const { slug } = useParams();
  const { user } = useAuth();
  const { blogs, deleteBlog } = useBlog();
  const navigate = useNavigate();

  const blog = blogs.find(({ slug: blogSlug }) => blogSlug === slug);

  const returnToBlog = () => {
    navigate('/blog');
  };

  const handleEditBlog = (slug) => {
    navigate(`/blog/${slug}/edit`);
  };

  const handleDeleteBlog = (id) => {
    deleteBlog(id);
    returnToBlog();
  };

  return (
    <div>
      <h3>{blog.title}</h3>
      <p>{blog.content}</p>
      {(user.permissions.includes(AuthPermission.DELETE) ||
        user.email === blog.user) && (
        <button onClick={() => handleDeleteBlog(blog.id)}>Eliminar</button>
      )}
      {(user.permissions.includes(AuthPermission.EDIT) ||
        user.email === blog.user) && (
        <button onClick={() => handleEditBlog(blog.slug)}>Editar</button>
      )}
      <button onClick={returnToBlog}>volver</button>
    </div>
  );
}

export { BlogArticle };
