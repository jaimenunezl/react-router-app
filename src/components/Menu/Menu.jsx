import React from 'react';
import { NavLink } from 'react-router-dom';

import { useAuth } from '../../hooks';
import './Menu.css';

const RouteVisibilityEnum = {
  ALWAYS: 'always ',
  PRIVATE: 'private',
  PUBLIC: 'public',
};

const routes = [
  { to: '/', text: 'Home', when: RouteVisibilityEnum.ALWAYS },
  { to: 'profile', text: 'Profile', when: RouteVisibilityEnum.PRIVATE },
  { to: 'blog', text: 'Blog', when: RouteVisibilityEnum.ALWAYS },
  { to: 'login', text: 'Login', when: RouteVisibilityEnum.PUBLIC },
  { to: 'logout', text: 'Logout', when: RouteVisibilityEnum.PRIVATE },
];

function Menu() {
  const { user } = useAuth();

  return (
    <>
      <nav className="navigation">
        {routes
          .filter(({ when }) => {
            if (when === 'public' && user) return false;
            if (when === 'private' && !user) return false;
            return true;
          })
          .map(({ to, text, when }) => {
            return (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  isActive ? 'link active' : 'link'
                }
              >
                <span>{text}</span>
              </NavLink>
            );
          })}
      </nav>
    </>
  );
}

export { Menu };
