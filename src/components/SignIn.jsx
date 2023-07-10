import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from './redux/authOperations';
import { Notify } from 'notiflix';
import styles from './signIn.module.css';

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
    <div className={styles.container}>
      <h1 className={styles.title}>Sign In</h1>
      <form onSubmit={handleSignIn} className={styles.form}>
        <label className={styles.label}>
          Email:
          <input type="email" name="email" required className={styles.input} />
        </label>
        <br />
        <label className={styles.label}>
          Password:
          <input type="password" name="password" required className={styles.input} />
        </label>
        <br />
        <button type="submit" className={styles.button}>
          Sign In
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/signup" className={styles.link}>Sign Up</Link>
      </p>
    </div>
  );
}

export default SignIn;
