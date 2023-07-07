import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);

  const renderAuthLinks = () => {
    if (isAuthenticated) {
      // User is logged in
      return (
        <div>
          <Link to="/logout">Logout</Link>
        </div>
      );
    } else {
      // User is not logged in or authentication state is undefined
      return (
        <div>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        </div>
      );
    }
  };

  return (
    <header>
      <h1>Phonebook App</h1>
      {renderAuthLinks()}
    </header>
  );
};

export default Header;
