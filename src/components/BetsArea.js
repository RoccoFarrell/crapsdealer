import React, { useState, useEffect, useRef } from 'react';
import { majorScale, Pane, Card, Text, Button, Heading, minorScale } from 'evergreen-ui';

import './BetsArea.css';

import img_chip from "../resources/chip.png";
import img_diceroll from "../resources/dices.png";

import img_onbutton from "../resources/onbutton.png";
import img_offbutton from "../resources/offbutton.png";

function BetsArea(props) {
    let crapsPlayers = props.players
    let gameState = props.gameState
    let minBet = props.minBet
    let debugMode = props.debugMode

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
            type: "basic",
            label: "Pass",
            selected: false
        },
        {
            id: 2,
            type: "basic",
            label: "Odds",
            selected: false
        },
        {
            id: 3,
            type: "buy",
            label: "Buy 4",
            selected: false
        },
        {
            id: 4,
            type: "buy",
            label: "Buy 5",
            selected: false
        },
        {
            id: 5,
            type: "buy",
            label: "Buy 6",
            selected: false
        },
        {
            id: 6,
            type: "buy",
            label: "Buy 8",
            selected: false
        },
        {
            id: 7,
            type: "buy",
            label: "Buy 9",
            selected: false
        },
        {
            id: 8,
            type: "buy",
            label: "Buy 10",
            selected: false
        },
        {
            id: 9,
            type: "hard",
            label: "Hard 4",
            selected: false
        },
        {
            id: 10,
            type: "hard",
            label: "Hard 6",
            selected: false
        },
        {
            id: 11,
            type: "hard",
            label: "Hard 8",
            selected: false
        },
        {
            id: 12,
            type: "hard",
            label: "Hard 10",
            selected: false
        }
    ])

    const [rollFlag, setRollFlag] = useState(false)

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

    const bgColor = (betID) => {
        return ((bets.filter(bet => {return bet.id === betID})[0].selected === true) ? 'yellow' : 'white' )
    }

    const rollBg = (index) => {
        if(rollFlag){
            return index % 2 === 0 ? 'lightblue' : 'white'
        } else {
            return index % 2 === 0 ? 'white' : 'lightblue'
        }
        
    }

    const betGroupPane = (group) => {
        return (
            <Pane
                display= 'flex'
                flexDirection='column'
            >
                <Heading>{group.charAt(0).toUpperCase() + group.slice(1)}</Heading>
                {bets.filter(bet => {return bet.type === group}).map((bet, index) => (
                    <Card
                        key={group + bet.id}
                        display='flex'
                        alignItems='center'
                        justifyContent='space-evenly'
                        flexDirection='column'
                        elevation={2}
                        width={56}
                        height={56}
                        // className='betPane'
                        borderRadius={majorScale(1)}
                        background={bgColor(bet.id)}
                        padding={minorScale(1)}
                        margin={minorScale(1)}
                        onClick={() => {
                            //console.log(bet)
                            let selectedBet = bets.filter(b => {
                                return b.id === bet.id
                            })[0]
                            selectedBet.selected = (selectedBet.selected === true ? false : true) 
                            setBets([...bets])
                            console.log(selectedBet)
                        }}
                    >
                        <img 
                            alt='chip' 
                            height='24px' 
                            width='24px' 
                            src={img_chip}
                        />
                        <Text>
                            {bet.label}
                        </Text>
                    </Card>
                ))}
            </Pane>
        )
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
                background='lightgreen'
                elevation={2}
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
                overflow='scroll'
                background='tealTint'
                padding={majorScale(1)}
                elevation={2}
                alignItems='flex-start'
                justifyContent='flex-start'
            >
                {/* Quick Bets */}
                <Pane
                    display='flex'
                    height='100%'
                    width='15%'
                    minWidth='100px'
                    background='tealTint'
                    flexDirection='column'
                    paddingY={majorScale(1)}
                    alignItems='center'
                    justifyContent='flex-start'
                    alignSelf='flex-start'
                >     
                    <Button
                        iconBefore='ring'
                        marginY={minorScale(1)}
                        onClick={() => {
                            crapsPlayers.forEach(player => {
                                player.bets.pass.enabled = true
                                player.bets.pass.count += 1
                                player.money -= minBet
                            })
                            props.onPlayersChange(crapsPlayers)
                        }}
                    >All Pass</Button>
                    <Button
                        iconBefore='selection'
                        intent='success'
                        marginY={minorScale(1)}
                        disabled={!gameState.pointOn}
                        onClick={() => {
                            crapsPlayers.forEach(player => {
                                player.bets.odds.enabled = true
                                player.bets.odds.count += 1
                                player.money -= minBet
                            })
                            props.onPlayersChange(crapsPlayers)
                        }}
                    > All Odds </Button>     
                    <Button
                        iconBefore='delete'
                        intent='danger'
                        marginY={minorScale(1)}
                        onClick={() => {
                            props.onClearAllBets()
                        }}
                    > Clear All  </Button> 
                </Pane>
                
                {/* All Bets */}
                <Pane
                    display='flex'
                    marginX={majorScale(1)}
                >
                    {betGroupPane('basic')}
                    {betGroupPane('buy')}
                    {betGroupPane('hard')}
                </Pane>
                <Pane>
                    <Button marginRight={16} appearance="primary" intent="success">Add</Button>
                    <Button marginRight={16} appearance="primary" intent="danger">Delete</Button>
                </Pane>
            </Pane>
        </Pane>
    )
}

export default BetsArea;