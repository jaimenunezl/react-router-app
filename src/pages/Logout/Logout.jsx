import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks';

function Logout() {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const onSubmit = (e) => {
    e.preventDefault();

    logout();
    navigate('/');
  };
  return (
    <>
      <h1>Logout</h1>

      <p>¿Seguro deseas salir?</p>
      <button onClick={onSubmit}>Si, salir</button>
    </>
  );
}

export { Logout };
