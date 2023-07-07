import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../redux/filterReducer";
import styles from "./filter.module.css";

const Filter = () => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value.trim()));
  };

    return (
    <div className={styles.filterContainer}>
      <label className={styles.label}>Filter contacts</label>
      <input
        className={styles.input}
        type="text"
        value={filter}
        onChange={handleChange}
      />
    </div>
  );
};

export default Filter;
