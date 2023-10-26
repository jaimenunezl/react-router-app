import React from 'react';
import { useAuth } from '../../hooks';

function Profile() {
  const { user } = useAuth();
  return <div>Hola, {user.email}</div>;
}

export { Profile };
