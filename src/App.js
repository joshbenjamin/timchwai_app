// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './screens/Home';
import PlayerScreen from './screens/PlayerScreen';
import TIMCHWAISCREEN from './screens/TIMCHWAIScreen';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/player/:playerId" element={<PlayerScreen />} />
          <Route path="/timchwai/" element={<TIMCHWAISCREEN />} />
          {/* <Route path='/timchwai' */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
