import React, { useState } from 'react';
import { majorScale, Pane, Card, Text, Button, Heading, minorScale } from 'evergreen-ui';

// import './Bets.css';

import img_chip from "../../resources/chip.png";

function Bets(props) {
    const oddsMax = 3

    let players = props.players
    let gameState = props.gameState
    let minBet = props.minBet
    // let debugMode = props.debugMode

    const disabledOnPoint = [1]
    const disabledOffPoint = [2]

    const [bets, setBets] = useState([
        {
            id: 1,
            type: "basic",
            label: "Pass",
            disabled: gameState.pointOn,
            selected: false
        },
        {
            id: 2,
            type: "basic",
            label: "Odds",
            disabled: !gameState.pointOn,
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

    const bgColor = (betID) => {
        return ((bets.filter(bet => {return bet.id === betID})[0].selected === true) ? 'yellow' : 'white' )
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
                            if((!disabledOnPoint.includes(bet.id) && gameState.pointOn) || (!disabledOffPoint.includes(bet.id) && !gameState.pointOn)){
                                let selectedBet = bets.filter(b => {
                                    return b.id === bet.id
                                })[0]
                                selectedBet.selected = (selectedBet.selected === true ? false : true) 
                                setBets([...bets])
                            }
                        }}
                    >
                        <img 
                            alt='chip' 
                            height='24px' 
                            width='24px' 
                            src={img_chip}
                            style={(disabledOffPoint.includes(bet.id) && !gameState.pointOn) || (disabledOnPoint.includes(bet.id) && gameState.pointOn) ? {filter: 'opacity(25%)'} : {}}
                        />
                        <Text>
                            {bet.label}
                        </Text>
                    </Card>
                ))}
            </Pane>
        )
    }

    const processBets = (addFlag) => {
        Object.values(bets).forEach(bet => {
            // console.log(bet)
            if(bet.selected){
                adjustBets(bet.id, addFlag, false) 
            }
        })
    }

    const adjustBets = (betID, addFlag, allFlag) => {
        console.log('adjusting bet ', betID, addFlag, allFlag)
        
        players.forEach(player => {
            switch(betID){
                case 1:
                    if(player.selected || allFlag){
                        if(addFlag){
                            player.bets.pass.enabled = true
                            player.bets.pass.count += 1
                            player.money -= minBet
                        } else {
                            if(player.bets.pass.count > 0){
                                player.bets.pass.count -= 1
                                player.money += minBet
                            }

                            if(player.bets.pass.count === 0){ 
                                player.bets.pass.enabled = false 
                            }
                        }  
                    }       
                    break
                case 2:
                    if(player.selected || allFlag){
                        if(addFlag){
                            if(player.bets.odds.count < oddsMax){
                                player.bets.odds.enabled = true
                                player.bets.odds.count += 1
                                player.money -= minBet
                            }
                        } else {
                            if(player.bets.odds.count > 0){
                                player.bets.odds.count -= 1
                                player.money += minBet
                            } 
                            
                            if(player.bets.odds.count === 0){ 
                                player.bets.odds.enabled = false 
                            }
                        }
                    }
                    break
                case 3:
                case 4:
                case 5:
                case 6:
                default:
                    break
            }
        })
        props.onPlayersChange(players)
    }

    const clearAllBets = () => {
        players.forEach(player => {
          Object.keys(player.bets).forEach(betGroup => {
            player.money += minBet * player.bets[betGroup].count
            player.bets[betGroup].enabled = false
            player.bets[betGroup].count = 0
          })
        })
        props.onPlayersChange(players)
    }

    return (
        <Pane
            display='flex'
            height='50vh'
            alignItems='center'
            width='100%'
            justifyContent='flex-start'
        >
            {/* Bets Area */}
            <Pane
                display='flex'
                height='100%'
                width='100%'
                border='tint2'
                borderRadius={majorScale(1)}
                overflow='scroll'
                background='tealTint'
                padding={majorScale(1)}
                marginRight={majorScale(1)}
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
                    <Text>Quick Bets</Text>
                    <Button
                        iconBefore='ring'
                        marginY={minorScale(1)}
                        disabled={gameState.pointOn}
                        onClick={() => {
                            adjustBets(1, true, true)
                        }}
                    >All Pass</Button>
                    <Button
                        iconBefore='selection'
                        intent='success'
                        marginY={minorScale(1)}
                        disabled={!gameState.pointOn}
                        onClick={() => {
                            adjustBets(2, true, true)
                        }}
                    > All Odds </Button>     
                    <Button
                        iconBefore='delete'
                        intent='danger'
                        marginY={minorScale(1)}
                        onClick={() => {
                            clearAllBets()
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

                {/* Confirm Bets */}
                <Pane
                    width='100%'
                    height='90%'
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    marginTop={majorScale(2)}
                >
                    <Button 
                        appearance="primary" 
                        intent="success"
                        marginY={majorScale(1)}
                        onClick={(e) => {
                            console.log('click add')
                            processBets(true)
                        }}
                    >
                        Add to Selected Players
                    </Button>
                    <Button 
                        appearance="primary" 
                        intent="danger"
                        marginY={majorScale(1)}
                        onClick={(e) => {
                            console.log('click remove')
                            processBets(false)
                        }}
                    >
                        Delete from Selected Players
                    </Button>
                </Pane>
            </Pane>
        </Pane>
    )
}

export default Bets;