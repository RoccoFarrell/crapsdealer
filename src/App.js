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
      name: 'Rocco',
      selected: false,
      money: 100,
      bets: {}
    },
    {
      id: 2,
      name: 'Truckle',
      selected: false,
      money: 100,
      bets: {}
    },
    {
      id: 3,
      name: 'Matt',
      selected: false,
      money: 100,
      bets: {}
    },
    {
      id: 4,
      name: 'Joe',
      selected: false,
      money: 100,
      bets: {}
    },
    {
      id: 5,
      name: 'Ben',
      selected: false,
      money: 100,
      bets: {}
    },
    {
      id: 6,
      name: 'Amalie',
      selected: false,
      money: 100,
      bets: {}
    }
  ]);

  const [gameState, setGameState] = useState({
    pointOn: false,
    point: 0
  })

  const handlePlayersChange = (playersArr) => {
    setCrapsPlayers([...playersArr])
  }

  const handleGameStateChange = (gameStateObj) => {
    setGameState({...gameStateObj})
  }

  const handleRollCalc = (roll) => {
    console.log('received roll' + roll)

    //Point is off
    if(gameState.pointOn === false){
      if(roll === 7){
        console.log('point off and 7')
        crapsPlayers.forEach(player => {
          if(player.bets.pass === true){
            player.money += 10 
          }
        })
        handlePlayersChange(crapsPlayers)
      }

      if([4,5,6,8,9,10].includes(roll)){
        gameState.pointOn = true
        gameState.point = roll
        handleGameStateChange(gameState)
      }
    } else {
      // Point is on
      if(roll === 7){
        gameState.pointOn = false
        handleGameStateChange(gameState)
        crapsPlayers.forEach(player => {
          player.bets.pass = player.bets.odds = false
        })
      }
      if([4,5,6,8,9,10].includes(roll)){
        if(gameState.point === roll){
          gameState.pointOn = false
          handleGameStateChange(gameState)
          crapsPlayers.forEach(player => {
            if(player.bets.pass === true){
              player.money += 30 
            }
          })
          handlePlayersChange(crapsPlayers)
        }
      }
    }

    if(gameState.pointOn === false && (roll === 2 || roll === 3 || roll === 12)) {
      console.log('point off and crap')
      crapsPlayers.forEach(player => {
        if(player.bets.pass === true){
          player.money -= 10
        }  
      })
      handlePlayersChange(crapsPlayers)
    }
  }

  return (
    <div className="App">
      <Pane width='100vw'>
        {/* <Heading size={700}>Craps Calculator</Heading> */}
      </Pane>

      {/* Player Bar */}
      <PlayerBar 
        players = { crapsPlayers } 
        gameState = { gameState }
        onPlayersChange = { handlePlayersChange }
        onGameStateChange = { handleGameStateChange } />
      {/* Bets */}
      <BetsArea
        players = { crapsPlayers } 
        gameState = { gameState }
        onPlayersChange = { handlePlayersChange }
        onGameStateChange = { handleGameStateChange }
        onRoll = { handleRollCalc }
      />
    </div>
  );
}

export default App;

