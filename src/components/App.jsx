
import { Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Header from './Header';
import NameForm from './NameForm';
import ContactList from './ContactList';
import styles from "./app.module.css"


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
        <Route path="/" element={<SignIn  />} />
        <Route path="/signin" element={<SignIn  />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/phonebook/*" element={<Phonebook />} />
      </Routes>
    </div>
  );
};

export default App;
