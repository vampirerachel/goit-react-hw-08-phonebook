import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Header from "./Header";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signIn" element={<SignIn />} />
      </Routes>
    </div>
  );
};

export default App;
