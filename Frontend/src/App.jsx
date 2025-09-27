import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {


  return (
    <div className='h-screen' data-theme="night">
      <Routes>
        <Route path="/" element={<h1 className='text-3xl font-bold underline'>Hello, world!</h1>} />
      </Routes>
    </div>
  )
}

export default App
