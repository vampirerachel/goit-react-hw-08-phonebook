import React, { useState } from 'react';
import { Routes, Route,  Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Header from './Header';
import NameForm from './NameForm';
import Filter from './Filter';
import ContactList from './ContactList';
import { login } from './redux/authOperations';


const Phonebook = () => {
  return (
    <div>
      <h2>Phonebook</h2>
      <NameForm />
      <Filter />
      <ContactList />
    </div>
  );
};

const App = () => {

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<SignIn  />} />
        <Route path="/signin" element={<SignIn  />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/phonebook/*" element={<Phonebook />} />
      </Routes>
    </div>
  );
};

export default App;
