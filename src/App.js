import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import './App.css';
import PlayerBar from './components/PlayerBar'
import { Pane, Text, Heading } from 'evergreen-ui';

function App() {

  const [crapsPlayers, setCrapsPlayers] = useState([
    {
      id: 1,
      name: 'Player 1',
      selected: false
    }
  ]);

  const handlePlayersChange = (playersArr) => {
    setCrapsPlayers([...playersArr])
  }

  return (
    <div className="App">
      <Pane width='100vw'>
        <Heading size={700}>Craps Calculator</Heading>
      </Pane>
      <PlayerBar 
        players = { crapsPlayers } 
        onPlayersChange = { handlePlayersChange } />
    </div>
  );
}

export default App;

