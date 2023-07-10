
import { Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Header from './Header';
import NameForm from './NameForm';
import ContactList from './ContactList';
import styles from "./app.module.css"
import PublicRoute from './publicRoute';
import PrivateRoute from './privateRoute';

const Phonebook = () => {
  return (
    <div className={styles.phonebookContainer}>
            <div className={styles.nameFormContainer}>
        <NameForm />
      </div>
      <ContactList />
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Header /> 
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />

        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        <Route
          path="/phonebook/*"
          element={
            <PrivateRoute>
              <Phonebook />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};
export default App