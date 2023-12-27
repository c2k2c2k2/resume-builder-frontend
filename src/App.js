import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Toaster />
      <Routes>
              <Route Component={Header} path="/" />
              <Route Component={Body} path="/resume-builder" />
              
            </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
