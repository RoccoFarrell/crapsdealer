import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import './App.css';
import PlayerBar from './components/PlayerBar'
import BetsArea from './components/BetsArea'
import { Pane } from 'evergreen-ui';

function App() {

  const [crapsPlayers, setCrapsPlayers] = useState([
    {
      id: 1,
      name: 'Player 1',
      selected: false,
      money: 0
    },
    {
      id: 2,
      name: 'Player 2',
      selected: false,
      money: 0
    },
    {
      id: 3,
      name: 'Player 3',
      selected: false,
      money: 0
    }
  ]);

  const handlePlayersChange = (playersArr) => {
    setCrapsPlayers([...playersArr])
  }

  return (
    <div className="App">
      <Pane width='100vw'>
        {/* <Heading size={700}>Craps Calculator</Heading> */}
      </Pane>

      {/* Player Bar */}
      <PlayerBar 
        players = { crapsPlayers } 
        onPlayersChange = { handlePlayersChange } />

      {/* Bets */}

      <BetsArea/>
    </div>
  );
}

export default App;

