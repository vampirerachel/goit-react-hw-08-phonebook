import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchContacts, deleteContact } from "../components/redux/contactReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDog, faCat, faFish } from "@fortawesome/free-solid-svg-icons";
import styles from "./contactList.module.css";
import Filter from "./Filter";

const iconOptions = [faDog, faCat, faFish];

const getRandomIcon = () => {
  const randomIndex = Math.floor(Math.random() * iconOptions.length);
  return iconOptions[randomIndex];
};

const ContactList = () => {
  const { items, isLoading, error } = useSelector((state) => state.contacts);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const [contactIcons, setContactIcons] = useState({});

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    const icons = {};
    items.forEach((contact) => {
      if (!contactIcons[contact.id]) {
        icons[contact.id] = getRandomIcon();
      }
    });
    setContactIcons((prevIcons) => ({ ...prevIcons, ...icons }));
  }, [items, contactIcons]);

  const filteredContacts = items.filter((contact) => {
    const nameMatch = contact.name.toLowerCase().includes(filter.toLowerCase());
    const numberMatch = contact.number.includes(filter);
    return nameMatch || numberMatch;
  });

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={styles.contactListContainer}>
      <div className={styles.spineDecoration}></div>
      <h2 className={styles.contactListTitle}>My Phonebook</h2>
      <Filter />
      {isLoading ? (
        <p className={styles.loadingMessage}>Loading contacts...</p>
      ) : error ? (
        <p className={styles.errorMessage}>Error: {error}</p>
      ) : filteredContacts.length === 0 ? (
        <p className={styles.noContactsMessage}>No contacts found.</p>
      ) : (
        <ul className={styles.contactList}>
          {filteredContacts.map((contact) => (
            <li key={contact.id} className={styles.contactListItem}>
              <FontAwesomeIcon icon={contactIcons[contact.id]} />
              <p>{contact.name}</p>
              <p>{contact.number}</p>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(contact.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
