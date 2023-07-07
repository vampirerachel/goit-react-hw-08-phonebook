import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchContacts, deleteContact } from "../redux/contactReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./contactList.module.css";
import Filter from "./Filter";

const ContactList = () => {
  const { items, isLoading, error } = useSelector((state) => state.contacts);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

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
      <h2 className={styles.contactListTitle}>Contact List</h2>
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
              <FontAwesomeIcon icon={contact.icon} />
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
