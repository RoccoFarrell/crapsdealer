import React, { useState, useEffect, useRef } from 'react';
import { majorScale, Pane, Button, Heading  } from 'evergreen-ui';

import './BetsArea.css';

import img_chip from "../resources/chip.png";
import img_diceroll from "../resources/dices.png";

import img_onbutton from "../resources/onbutton.png";
import img_offbutton from "../resources/offbutton.png";

import Bets from './Bets.js/Bets'

function BetsArea(props) {
    let crapsPlayers = props.players
    let gameState = props.gameState
    let minBet = props.minBet
    let debugMode = props.debugMode

    const [roll, setRoll] = useState({
        currentRoll: 0,
        lastTenRolls: []
    })
    
    const [rollFlag, setRollFlag] = useState(false)
    const [rotate, setRotate] = useState(false)
    const imageRef = useRef(null)

    const randomRoll = () => {
        const min = 1;
        const max = 6;
        const tempRoll = Math.round(min + Math.random() * (max - min)) + Math.round(min + Math.random() * (max - min))
        return tempRoll
    }

    const rollHandler = (inputRoll) => {
        let tempRoll = 0

        if(inputRoll){
            tempRoll = inputRoll
        } else {
            tempRoll = randomRoll()
        }

        setRollFlag(!rollFlag)  

        let tempArr = roll.lastTenRolls

        if(tempArr.length < 10){
            tempArr.unshift(tempRoll)
        } else {
            tempArr.unshift(tempRoll)
            tempArr.splice(10, 1)
        } 
        setRoll({
            ...roll,
            currentRoll: tempRoll,
            lastTenRolls: tempArr
        })
        props.onRoll(tempRoll)
        setRotate(true)
    }

    const betHandler = (betID, allPlayerFlag) => {
        //
    }

    const rollBg = (index) => {
        if(rollFlag){
            return index % 2 === 0 ? 'lightblue' : 'white'
        } else {
            return index % 2 === 0 ? 'white' : 'lightblue'
        }
        
    }

    const debugDiceVals = () => {
        return (
        <Pane 
            display='flex' 
            flexDirection='column'
        >
            {[2,3,4,5,6,7,8,9,10,11,12].map(val => {
                return (
                    <Button
                        key={val}
                        height={24}
                        marginY={1}
                        onClick={(e) => {
                            e.stopPropagation()
                            rollHandler(val)
                        }}
                    >
                        {val}
                    </Button>
                )
            })}
        </Pane>
        )
    }

    useEffect(() => {
        if(rotate) {
            setTimeout(() => {
                setRotate(false)
            }, 1000)
        }
      }, [
        rotate
      ]);

    return (
        <Pane
            display='flex'
            height='50vh'
            alignItems='center'
            justifyContent='flex-start'
            paddingX={majorScale(1)}
        >
            {/* Roll Button */}
            <Pane
                display='flex'
                height='90%'
                width='10%'
                border='tint2'
                borderRadius={majorScale(1)}
                background='lightgreen'
                elevation={2}
                activeElevation={0}
                marginX={majorScale(1)}
                alignItems='center'
                justifyContent='center'
                onClick={() => {
                    rollHandler()
                }}
            >
                <Pane>
                    <img alt='diceroll' width='100px' height='100px' src={img_diceroll} />
                </Pane>
                { debugMode ? debugDiceVals()  : (<div></div>)}
            </Pane>

            {/* Roll Details Area */}
            <Pane
                display='flex'
                height='100%'
                width='15%'
                border='muted'
                borderRadius={majorScale(1)}
                marginX={majorScale(1)}
                flexDirection='column'
                alignItems='center'
                justifyContent='space-evenly'
            >
                <img 
                    alt='chip' 
                    height='50px' 
                    width='50px' 
                    src={img_chip}
                    className={rotate ? "rotate" : ""}
                    ref={imageRef}
                />
                <Heading 
                    size={roll.currentRoll === 0 ? 400 : 800}
                    margin={majorScale(2)}
                >
                    {roll.currentRoll === 0 ? 'Roll to Start' : roll.currentRoll}
                </Heading>
                <Pane
                    display='flex'
                    justifyContent='space-evenly'
                    alignItems='center'
                    width='100%'
                >
                    <Pane
                        background='lightyellow'
                        border='muted'
                    >
                        <img 
                            alt='offbutton' 
                            height='50px' 
                            width='50px' 
                            src={gameState.pointOn ? img_onbutton : img_offbutton}
                            // style={gameState.pointOn ? {} : {filter: 'opacity(25%)'}}
                        />
                    </Pane>
                    { gameState.pointOn ? (
                        <Pane
                            height='50px' 
                            width='50px' 
                            display='flex'
                            justifyContent='center'
                            alignItems='center'
                            background='purpleTint'
                        >
                            <Heading size={600}>{ gameState.point }</Heading>
                        </Pane>   
                    ) : ''}
                            
                </Pane>
            </Pane>

            {/* Last Rolls Area */}
            <Pane
                display='flex'
                height='100%'
                width='3%'
                border='muted'
                borderRadius={majorScale(1)}
                marginRight={majorScale(1)}
                flexDirection='column'
                alignItems='center'
                justifyContent='flex-start'
            >

                {roll.lastTenRolls.map((r, index) => (
                    <Pane 
                        key={index} 
                        paddingY={majorScale(1)}
                        background={rollBg(index)}
                        width='100%'
                    >
                        {r}
                    </Pane>
                ))}
            </Pane>
            
            {/* Bets Area */}
            <Bets
                players = { crapsPlayers }
                gameState = { gameState }
                minBet = { minBet }
                debugMode = { debugMode }
                onPlayersChange = { props.onPlayersChange }
            />
        </Pane>
    )
}

export default BetsArea;