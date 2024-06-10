import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import SignUp from './components/authentication/signup';
import SignIn from './components/authentication/signin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/dashboard';
// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>

      <LandingPage />
    </QueryClientProvider>
  );
}

export default App;
