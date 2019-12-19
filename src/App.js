import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import './App.css';
import PlayerBar from './components/PlayerBar'
import { Pane, Heading } from 'evergreen-ui';

import img_chip from "./resources/chip.png";

function App() {

  const [crapsPlayers, setCrapsPlayers] = useState([
    {
      id: 1,
      name: 'Player 1',
      selected: false
    },
    {
      id: 2,
      name: 'Player 2',
      selected: false
    },
    {
      id: 3,
      name: 'Player 3',
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
      <img alt='chip' width='50px' src={img_chip}/>
    </div>
  );
}

export default App;

