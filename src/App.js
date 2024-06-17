// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

import TIMCHWAISCREEN from './screens/TIMCHWAIScreen';
import PlayerScreen from './screens/PlayerScreen';
import RandomScreen from './screens/RandomScreen';
import Euro2024Screen from './screens/Euro2024Screen';

function App() {
  return (
    <div className="App">
      <Analytics />
      <Router>
        <Routes>
          <Route index path="/" element={<RandomScreen />} />
          <Route index path="/Euro2024" element={<Euro2024Screen />} />
          <Route index path="/filter" element={<TIMCHWAISCREEN />} />
          <Route path="/player/:playerId" element={<PlayerScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
