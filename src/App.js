import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import './App.css';
import PlayerBar from './components/PlayerBar'
import BetsArea from './components/BetsArea'
import { Pane } from 'evergreen-ui';

function App() {

	const [minBet, setMinBet] = useState(1)
	const [debugMode, setDebugMode] = useState(false)

	const generatePlayer = (inputID, inputName, inputMoney) => {
		return (
		{ 
			id: inputID,
			name: inputName,
			selected: false,
			money: inputMoney,
			bets: {
			pass: {
				enabled: false,
				count: 0
			},
			odds: {
				enabled: false,
				count: 0
			}
			}
		}
		)
	}

const [crapsPlayers, setCrapsPlayers] = useState([
    generatePlayer(1, 'Rocco', 20),
    generatePlayer(2, 'Joe', 20),
    generatePlayer(3, 'Truckle', 20),
    generatePlayer(4, 'Matt', 20),
    generatePlayer(5, 'Ben', 20)
  ]);

const [gameState, setGameState] = useState({
    pointOn: false,
    point: 0
  })

const handlePlayersChange = (playersArr) => {
    setCrapsPlayers([...playersArr])
  }

const handleAddPlayer = (newName) => {
    setCrapsPlayers([
      ...crapsPlayers,
      generatePlayer(crapsPlayers.length + 1, newName, 20)
    ])
  }

const handleGameStateChange = (gameStateObj) => {
    setGameState({...gameStateObj})
  }

const handleMinBetChange = (newMinBet) => {
    setMinBet(newMinBet)
  }

const handleDebugChange = () => {
    setDebugMode(!debugMode)
  }

const handleBetAdjust = (playerID, betID, winFlag, winRoll) => {
	// console.log('playerID: ', playerID, 'betID: ', betID, 'winFlag: ', winFlag, 'winRoll: ', winRoll)
    let findPlayer = crapsPlayers.filter(p => {return p.id === playerID})[0]

    //adjust bets
    switch(betID){
      case 'pass':
        if(winFlag){
			// console.log('paying out pass to ', findPlayer.name, ': ', (minBet * (findPlayer.bets.pass.count * 2)))
          	findPlayer.money += (minBet * (findPlayer.bets.pass.count * 2))
        }
        findPlayer.bets.pass.enabled = false
        findPlayer.bets.pass.count = 0
        break
      case 'odds':
        if(winFlag){
			console.log(playerID, ' won odds bet')
			switch(winRoll){
				case 4:
				case 10:
					// console.log('paying out odds to ', findPlayer.name, ': ', (minBet * (findPlayer.bets.odds.count * 3)))
					findPlayer.money += (minBet * (findPlayer.bets.odds.count * 3))
					break
				case 5:
				case 9:
					// console.log('paying out odds ', findPlayer.name, ': ', (minBet * (findPlayer.bets.odds.count * 2.5)))
					findPlayer.money += (minBet * (findPlayer.bets.odds.count * 2.5))
					break
				case 6:
				case 8:
					//console.log('paying out odds to ', findPlayer.name, ': ', (minBet * (findPlayer.bets.odds.count * 2.2)))
					findPlayer.money += (minBet * (findPlayer.bets.odds.count * 2.2))
					break
				default:
					break 
			}
			findPlayer.bets.odds.enabled = false
			findPlayer.bets.odds.count = 0
        } else {
          findPlayer.bets.odds.enabled = false
          findPlayer.bets.odds.count = 0
        }
        break
      default:
        break
    }
    handlePlayersChange(crapsPlayers)
  }

const calculateBets = (betID, winFlag, winRoll) => {
	//Iterate over each player
	crapsPlayers.forEach(player => {
		if(player.bets.pass.enabled && betID === 'pass'){
			handleBetAdjust(player.id, betID, winFlag, winRoll)
		}

		if(player.bets.odds.enabled && betID === 'odds'){
			handleBetAdjust(player.id, betID, winFlag, winRoll)
		}
	})
}

const handleRollCalc = (roll) => {

    let endPointOn = false
    let winFlag = false

	//Point Off
	if(gameState.pointOn === false){
		//Hit craps or 11
		if(roll === 7 || roll === 11){
			winFlag = true
			calculateBets('pass', true, roll)
		} else if(roll === 2 || roll === 3 || roll === 12){
			winFlag = false
			calculateBets('pass', false, roll)
		}
		//Point on
		if([4,5,6,8,9,10].includes(roll)){
			endPointOn = true
			gameState.point = roll
		}
	} else {
        // Point is on
        // 7 Out
        if(roll === 7){
			endPointOn = false
			calculateBets('pass', false, roll)
			calculateBets('odds', false, roll)   
        } else 
        // Roll inner number
        if([4,5,6,8,9,10].includes(roll)){
			// POINT IS MADE!!
			
			if(gameState.point === roll){
				console.log('point is made!!')
				endPointOn = false
				calculateBets('pass', true, roll)
				calculateBets('odds', true, roll)  
			}
        } else
        // Roll outer number
        if([2,3,11,12].includes(roll)){
        }
    }

	gameState.pointOn = endPointOn
	gameState.lastResult = winFlag
    handleGameStateChange(gameState)
  }

  return (
    <div className="App">
      <Pane width='100vw'>
        {/* <Heading size={700}>Craps Calculator</Heading> */}
      </Pane>

      {/* Player Bar */}
      <PlayerBar 
        players = { crapsPlayers } 
        onPlayersChange = { handlePlayersChange }
        addPlayer = { handleAddPlayer }
        gameState = { gameState }
        onGameStateChange = { handleGameStateChange }
        minBet = { minBet }
        onMinBetChange = { handleMinBetChange } 
        debugMode = { debugMode }
        onDebugChange = { handleDebugChange }/>
      {/* Bets */}
      <BetsArea
        minBet = { minBet }
        players = { crapsPlayers } 
        gameState = { gameState }
        debugMode = { debugMode }
        onPlayersChange = { handlePlayersChange }
        onGameStateChange = { handleGameStateChange }
        onRoll = { handleRollCalc }
      />
    </div>
  );
}

export default App;

