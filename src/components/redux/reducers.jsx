import { createSlice } from '@reduxjs/toolkit';


const filterSlice = createSlice({
  name: 'filter', 
  initialState: '', 
  reducers: {
    setFilter: (state, action) => {
      return action.payload;
    },
  },
});

const initialState = [];

const contactsSlice = createSlice({
  name: 'contacts', 
  initialState, 
  reducers: {

    addContact: (state, action) => {
      return [...state, action.payload];
    },
    // Define the "deleteContact" action and its reducer logic
    deleteContact: (state, action) => {
      return state.filter(contact => contact.id !== action.payload);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const { setFilter } = filterSlice.actions;

const reducers = {
  contacts: contactsSlice.reducer,
  filter: filterSlice.reducer,
};

export default reducers;
