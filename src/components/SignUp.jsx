import React, { useState } from 'react';
import useAuth from './redux/auth';

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
    <div>
      <h1>Sign Up</h1>
      {registrationSuccess ? (
        <p>Registration successful!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <button type="submit">Sign Up</button>
        </form>
      )}
    </div>
  );
}

export default SignUp;
