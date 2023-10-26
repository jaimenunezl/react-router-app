import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useBlog } from '../../context';

function BlogEdit() {
  const { slug } = useParams();
  const { blogs, editBlog } = useBlog();
  const blog = blogs.find(({ slug: blogSlug }) => blogSlug === slug);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, content } = e.target.elements;

    editBlog({ id: blog.id, title: title.value, content: content.value });
    navigate('/blog');
  };

  const handleReturn = () => {
    navigate('/blog');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" defaultValue={blog.title} />

        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          defaultValue={blog.content}
        ></textarea>

        <button type="submit">Guardar</button>
        <button type="button" onClick={handleReturn}>
          Volver
        </button>
      </form>
    </div>
  );
}

export { BlogEdit };
