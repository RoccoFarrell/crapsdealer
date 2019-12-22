import React, { useState, useEffect, useRef } from 'react';
import { majorScale, Pane, Card, Text, Button, TextInput, Icon, IconButton, Heading, minorScale } from 'evergreen-ui';

import './BetsArea.css';

import img_chip from "../resources/chip.png";
import img_diceroll from "../resources/dices.png";

import img_onbutton from "../resources/onbutton.png";
import img_offbutton from "../resources/offbutton.png";

function BetsArea(props) {
    let crapsPlayers = props.players
    let gameState = props.gameState

    const randomRoll = () => {
        const min = 1;
        const max = 6;
        const tempRoll = Math.round(min + Math.random() * (max - min)) + Math.round(min + Math.random() * (max - min))
        return tempRoll
    }

    const [roll, setRoll] = useState({
        currentRoll: 0,
        lastTenRolls: []
    })

    const [rotate, setRotate] = useState(false)
    const imageRef = useRef(null)

    const [bets, setBets] = useState([
        {
            id: 1,
            name: 'Pass',
            selected: false
        },
        {
            id: 2,
            name: 'Odds',
            selected: false
        },
        {
            id: 2,
            name: 'Buy',
            selected: false
        },
        {
            id: 2,
            name: 'Hard',
            selected: false
        }
      ]);
    
    const [rollFlag, setRollFlag] = useState(false)

    const rollHandler = () => {
        const tempRoll = randomRoll()
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

    const crapsButtonHandler = () => {
        props.gameState.pointOn ? console.log('on') : console.log('off')
    }

    const bgColor = (bet) => {
        return ((bet.selected === true) ? 'yellow' : 'white' )
    }

    const rollBg = (index) => {
        if(rollFlag){
            return index % 2 === 0 ? 'lightblue' : 'white'
        } else {
            return index % 2 === 0 ? 'white' : 'lightblue'
        }
        
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
                background='lightgreen'
                elevation={2}
                marginX={majorScale(1)}
                alignItems='center'
                justifyContent='center'
                onClick={() => {
                    rollHandler()
                }}
            >
                <img alt='diceroll' width='100px' height='100px' src={img_diceroll}/>
            </Pane>

            {/* Roll Details Area */}
            <Pane
                display='flex'
                height='100%'
                width='15%'
                border='muted'
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
                    >
                        <img 
                            alt='onbutton' 
                            height='50px' 
                            width='50px' 
                            src={img_onbutton}
                            style={gameState.pointOn ? {} : {filter: 'opacity(25%)'}}
                        />
                    </Pane>
                    <Pane
                        background='lightyellow'
                        border='muted'
                    >
                        <img 
                            alt='offbutton' 
                            height='50px' 
                            width='50px' 
                            src={img_offbutton}
                            style={gameState.pointOn ? {filter: 'opacity(25%)'} : {}}
                        />
                    </Pane>          
                </Pane>
            </Pane>

            {/* Last Rolls Area */}
            <Pane
                display='flex'
                height='100%'
                width='3%'
                border='muted'
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
            <Pane
                display='flex'
                height='100%'
                width='65%'
                background='tealTint'
                paddingX={majorScale(1)}
                elevation={2}
                alignItems='center'
                justifyContent='flex-start'
            >
                {/* Quick Bets */}
                <Pane
                    display='flex'
                    height='100%'
                    width='15%'
                    background='tealTint'
                    flexDirection='column'
                    paddingY={majorScale(1)}
                    alignItems='center'
                    justifyContent='flex-start'
                    alignSelf='flex-start'
                >     
                    <Button
                        iconBefore='ring'
                        intent='warning'
                        marginY={minorScale(1)}
                        onClick={() => {
                            crapsPlayers.forEach(player => {
                                player.bets.pass = true
                            })
                            props.onPlayersChange(crapsPlayers)
                        }}
                    > All Pass </Button>
                    <Button
                        iconBefore='selection'
                        intent='success'
                        marginY={minorScale(1)}
                        onClick={() => {
                            crapsPlayers.forEach(player => {
                                player.bets.odds = true
                            })
                            props.onPlayersChange(crapsPlayers)
                        }}
                    > All Odds </Button>     
                    <Button
                        iconBefore='delete'
                        intent='danger'
                        marginY={minorScale(1)}
                        onClick={() => {
                            crapsPlayers.forEach(player => {
                                player.bets.pass = false
                                player.bets.odds = false
                            })
                            props.onPlayersChange(crapsPlayers)
                        }}
                    > Clear All </Button> 
                </Pane>
                {bets.map((bet, index) => (
                    <Card
                        key={index}
                        display='flex'
                        flexDirection='column'
                        elevation={2}
                        // className='betPane'
                        borderRadius={majorScale(1)}
                        background={bgColor(bets[index])}
                        padding={majorScale(1)}
                        margin={majorScale(1)}
                        onClick={() => {
                            bets[index].selected = (bets[index].selected === true ? false : true)
                            setBets([...bets])
                        }}
                    >
                        <img 
                            alt='chip' 
                            height='50px' 
                            width='50px' 
                            src={img_chip}
                        />
                        <Text>
                            {bet.name}
                        </Text>
                    </Card>


                ))}
                    <Button marginRight={16} appearance="primary" intent="success">Add</Button>
                    <Button marginRight={16} appearance="primary" intent="danger">Delete</Button>
            </Pane>
        </Pane>
    )
}

export default BetsArea;