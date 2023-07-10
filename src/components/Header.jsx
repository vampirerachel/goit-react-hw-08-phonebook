import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { authSelectors } from './redux/authSelectors';
import { logOut } from './redux/authOperations';
import styles from './header.module.css';

const Header = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const userName = useSelector(authSelectors.getUserName);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logOut());
    // Redirect to sign-in page after logout
    return <Navigate to="/signin" />;
  };

  const renderAuthLinks = () => {
    if (isLoggedIn) {
      return (
        <div className={styles.userInfo}>
          <span className={styles.username}>{userName}</span>
          <button onClick={handleLogout} className={styles.button}>
            Sign Out
          </button>
        </div>
      );
    } else {
      if (location.pathname === '/signup') {
        return (
          <div className={styles.links}>
            <Link to="/signin" className={styles.button}>
              Sign In
            </Link>
          </div>
        );
      } else if (location.pathname === '/signin') {
        return (
          <div className={styles.links}>
            <Link to="/signup" className={styles.button}>
              Sign Up
            </Link>
          </div>
        );
      } else {
        return null;
      }
    }
  };

  return (
    <header className={styles.header}>
      <span className={styles.title}>Phonebook App</span>
      {renderAuthLinks()}
    </header>
  );
};

export default Header;
