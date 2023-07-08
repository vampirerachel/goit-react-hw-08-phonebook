import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styles from "./header.module.css";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  const location = useLocation();

  const renderAuthLinks = () => {
    if (isAuthenticated) {
      // User is logged in
      return (
        <div className={styles.links}>
          <Link to="/logout" className={styles.link}>
            Logout
          </Link>
        </div>
      );
    } else {
      // User is not logged in or authentication state is undefined
      if (location.pathname === "/signin") {
        // Show "Sign Up" button on the sign-in page
        return (
          <div className={styles.links}>
            <Link to="/signup" className={styles.link}>
              Sign Up
            </Link>
          </div>
        );
      } else if (location.pathname === "/signup" || location.pathname === "/") {
        // Show "Sign In" button on the sign-up page
        return (
          <div className={styles.links}>
            <Link to="/signin" className={styles.link}>
              Sign In
            </Link>
          </div>
        );
      } else {
        // Show both "Sign Up" and "Login" buttons on other pages
        return (
          <div className={styles.links}>
            <Link to="/signup" className={styles.link}>
              Sign Up
            </Link>
            <Link to="/signin" className={styles.link}>
              Sign In
            </Link>
          </div>
        );
      }
    }
  };

  return (
    <header className={styles.header}>
      <Link to="/signin" className={styles.title}>
        Phonebook App
      </Link>
      {renderAuthLinks()}
    </header>
  );
};

export default Header;
