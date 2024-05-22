import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import SignUp from './components/authentication/signup';
import SignIn from './components/authentication/signin';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from './components/dashboard';

function App() {
  return (
    <LandingPage />
  );
}

export default App;
