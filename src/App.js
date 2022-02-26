import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MessageArea from './components/MessageArea';
import Join from './components/Join';

function App() {

  return (
    <>
      <div className="app" style={{ border: '10px solid black' }}>

        <Router>

          <Routes>

            <Route path="/" element={<Join />} />
            <Route path="/chat" element={<MessageArea />} />

          </Routes>

        </Router>

      </div>
    </>
  );
}


export default App;
