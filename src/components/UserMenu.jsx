import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './redux/authSlice';

const UserMenu = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.user.email);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <p>{userEmail}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserMenu;
