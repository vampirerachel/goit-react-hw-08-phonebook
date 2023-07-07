import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../redux/contactReducer";
import { nanoid } from "@reduxjs/toolkit";
import styles from "./nameForm.module.css";

const NameForm = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);

  const capitalizeFirstLetter = (str) => {
    return str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formattedName = capitalizeFirstLetter(name.trim());
    const formattedNumber = number.trim();

    if (contacts.some((contact) => contact.name === formattedName)) {
      alert("Contact with the same name already exists.");
      return;
    }

    const newContact = {
      id: nanoid(),
      name: formattedName,
      number: formattedNumber,
    };

    dispatch(addContact(newContact));
    setName("");
    setNumber("");
  };

  const handleNameChange = (event) => {
    const { value } = event.target;
    if (/^[a-zA-Z\s]*$/.test(value) || value === "") {
      setName(value);
    }
  };

  const handleNumberChange = (event) => {
    const { value } = event.target;
    if (/^\d*$/.test(value) || value === "") {
      setNumber(value);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.phonebook}>
        <h2 className={styles.phonebookTitle}>My Phonebook</h2>
      </div>
      <p className={styles.label}>Name</p>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type="text"
            name="name"
            required
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <p className={styles.label}>Number</p>
          <input
            className={styles.input}
            type="text"
            name="number"
            required
            value={number}
            onChange={handleNumberChange}
          />
        </div>
        <button className={styles.button} type="submit">
          Add New Contact
        </button>
      </form>
    </div>
  );
};

export default NameForm;
