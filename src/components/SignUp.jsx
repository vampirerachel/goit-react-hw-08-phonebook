import React, { useState } from 'react';
import useAuth from './redux/auth';
import styles from './signUp.module.css';

function SignUp() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await register(formData);
      setRegistrationSuccess(true);
      setFormData({
        name: '',
        email: '',
        password: '',
      });
    } catch (error) {
      console.log('Registration error:', error);
      setRegistrationSuccess(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign Up</h1>
      {registrationSuccess ? (
        <p className={styles.successMessage}>Registration successful!</p>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </label>
          <br />
          <label className={styles.label}>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </label>
          <br />
          <label className={styles.label}>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              minLength={7}
              required
            />
            {formData.password.length > 0 && formData.password.length < 7 && (
              <p className={styles.errorMessage}>
                Password must be at least 7 characters long.
              </p>
            )}
          </label>
          <br />
          <button type="submit" className={styles.button}>
            Sign Up
          </button>
        </form>
      )}
    </div>
  );
}

export default SignUp;
