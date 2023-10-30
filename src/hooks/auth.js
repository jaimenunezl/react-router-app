import { createContext, useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const roles = {
  ADMIN: 'ADMIN',
  EDITOR: 'EDITOR',
  USER: 'USER',
};

const AuthPermission = {
  READ: 'READ',
  DELETE: 'DELETE',
  EDIT: 'EDIT',
};

const userList = [
  {
    email: 'jaime.nunez@reign.cl',
    role: roles.ADMIN,
  },
  {
    email: 'jaime.nunez+1@reign.cl',
    role: roles.USER,
  },
  {
    email: 'jaime.nunez+2@reign.cl',
    role: roles.EDITOR,
  },
];

const rolePermissions = [
  {
    role: roles.ADMIN,
    permissions: [
      AuthPermission.READ,
      AuthPermission.DELETE,
      AuthPermission.EDIT,
    ],
  },
  {
    role: roles.EDITOR,
    permissions: [AuthPermission.READ, AuthPermission.EDIT],
  },
  {
    role: roles.USER,
    permissions: [AuthPermission.READ],
  },
];

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [redirect, setRedirect] = useState(null);

  const login = ({ email }) => {
    const user = userList.find(({ email: adminEmail }) => adminEmail === email);

    if (!user) throw new Error('User not found');

    const { permissions } = rolePermissions.find(
      ({ role }) => role === user.role
    );

    setUser({ email, role: user.role, permissions: permissions || [] });
  };

  const logout = () => {
    setUser(null);
  };

  const savePendingRedirect = (location) => {
    setRedirect(location);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, redirect, savePendingRedirect }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

function AuthRoute({ children }) {
  const { user, savePendingRedirect } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      savePendingRedirect(location);
    }
  }, [location, savePendingRedirect, user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export { AuthProvider, useAuth, AuthRoute, AuthPermission, roles };
