// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

import TIMCHWAISCREEN from './screens/TIMCHWAIScreen';
import PlayerScreen from './screens/PlayerScreen';
import RandomScreen from './screens/RandomScreen';

function App() {
  return (
    <div className="App">
      <Analytics />
      <Router>
        <Routes>
          <Route index path="/" element={<RandomScreen />} />
          <Route index path="/filter" element={<TIMCHWAISCREEN />} />
          <Route path="/player/:playerId" element={<PlayerScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
