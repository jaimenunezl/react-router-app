import { useNavigate } from 'react-router-dom';
import { useBlog } from '../../context';
import { useAuth } from '../../hooks';

function BlogNew() {
  const { user } = useAuth();
  const { addBlog } = useBlog();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, content } = e.target.elements;

    addBlog({ title: title.value, content: content.value, user: user.email });
    navigate('/blog');
  };

  const handleReturn = () => {
    navigate('/blog');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" />

        <label htmlFor="content">Content</label>
        <textarea id="content" name="content"></textarea>

        <button type="submit">Guardar</button>
        <button type="button" onClick={handleReturn}>
          Volver
        </button>
      </form>
    </div>
  );
}

export { BlogNew };
