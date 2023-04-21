// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './screens/Home';
import PlayerScreen from './screens/PlayerScreen';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/player/:playerId" element={<PlayerScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
