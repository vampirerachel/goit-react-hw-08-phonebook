import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from './redux/authOperations';
import { Notify } from 'notiflix';

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleSignIn = async (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const credentials = {
    email: data.get('email'),
    password: data.get('password'),
  };

  try {
    await dispatch(login(credentials)).unwrap();
    navigate('/phonebook');
  } catch (error) {
    Notify.failure('Something went wrong on login');
    console.log(error);
    navigate('/signin');
  }
};


  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <br />
        <button type="submit">Sign In</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default SignIn;
