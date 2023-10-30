import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { login, user, redirect, savePendingRedirect } = useAuth();

  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);

    try {
      login({ email });

      if (redirect) {
        navigate(redirect);
      } else {
        navigate('/');
      }
      savePendingRedirect(null);
    } catch {
      setError('Credenciales incorrectas');
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Clave</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Inicia Sesión</button>
        {error && <p style={{ color: 'red' }}>Credenciales incorrectas</p>}
      </form>
    </>
  );
}

export { Login };
