import React, { useState } from 'react';
import { majorScale, minorScale, Pane, Text, Heading, TextInput, Icon, IconButton } from 'evergreen-ui';

function PlayerBar(props) {
    let crapsPlayers = props.players
    console.log(crapsPlayers)
    let bgColor = (player) => {
        return ((player.selected === true) ? 'yellow' : 'tealTint' )
    }
    let paneHeight = '40vh'

    const [editLock, setEditLock] = useState(false)

    let styles = {
        playerPane: {
        }
    }

    return (
        <Pane 
            clearfix 
            width='100%'
            display='flex'
            marginBottom={majorScale(1)}
            paddingX={majorScale(1)}
        >
            {/* Action Buttons */}
            <Pane
                    display='flex'
                    height={paneHeight}
                    marginY={majorScale(1)}
                    paddingY={majorScale(1)}
                    justifyContent='space-evenly'
                    alignItems='center'
                    flexDirection='column'
                    clearfix
                >
                    <IconButton
                        icon='lock'
                        color='muted'
                        marginX={minorScale(1)}
                        onClick={(e) => {
                            e.stopPropagation()
                            setEditLock(!editLock)
                        }}
                    />
                    {/* <IconButton
                        icon='edit'
                        color='muted'
                        marginX={minorScale(1)}
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                    /> */}
                    <IconButton
                        icon='left-join'
                        color='muted'
                        marginX={minorScale(1)}
                        onClick={(e) => {
                            e.stopPropagation()
                            crapsPlayers.forEach(player => {
                                player.selected = false
                            })
                            props.onPlayersChange(crapsPlayers)
                        }}
                    />
            </Pane>

            {/* Player Tiles*/}
            {crapsPlayers.map((player, index) => (
            <Pane key={index}
                background={bgColor(crapsPlayers[index])}
                border="muted"
                elevation={2}
                margin={majorScale(1)}
                paddingTop={majorScale(1)}
                paddingX={majorScale(1)}
                width={ (majorScale(10) / crapsPlayers.length) + 'vw' }
                height={paneHeight}
                float='left'
                onClick={(e) => {
                    crapsPlayers[index].selected = (crapsPlayers[index].selected === true ? false : true)
                    props.onPlayersChange(crapsPlayers)
                }}
            >
                {/* Player Name and Bet Amount */}
                <Pane
                    padding={majorScale(1)}
                    // border='muted'
                >
                    { editLock ? (
                        <Pane
                            // border='muted'
                            display='flex'
                            justifyContent='space-around'
                            alignItems='center'
                            height='20%'
                        >
                            <TextInput
                                width={majorScale(15)}
                                height='15%'
                                onChange={e => {
                                    crapsPlayers[index].name = e.target.value
                                    props.onPlayersChange(crapsPlayers)
                                }}
                                onClick={e => e.stopPropagation()}
                                value={crapsPlayers[index].name}
                            />
                            <TextInput
                                width={majorScale(6)}
                                height='15%'
                                onChange={e => {
                                    crapsPlayers[index].money = parseInt(e.target.value)
                                    props.onPlayersChange(crapsPlayers)
                                }}
                                onClick={e => e.stopPropagation()}
                                value={crapsPlayers[index].money}
                            />
                            <IconButton 
                                icon='trash'
                                intent='danger'
                                onClick={(e) => {
                                    e.stopPropagation()
                                    crapsPlayers.splice(index,1)
                                    props.onPlayersChange(crapsPlayers)
                                }}
                            />
                        </Pane>
                    ) : (
                        <Pane
                            // border='muted'
                            display='flex'
                            justifyContent='space-around'
                            alignItems='center'
                            height='20%'
                        >
                            <Heading size={600}>{player.name}</Heading>
                            <Heading size={600} color='green'>${player.money}</Heading>
                        </Pane>
                    )}
                </Pane>
                {/* Player Main Section */}
                <Pane
                    height='65%'
                    display='flex'
                    justifyContent='flex-begin'
                    alignItems='flex-begin'
                    margin={majorScale(1)}
                >
                    {player.bets.pass === true ? 
                            <Pane key={player.name + '1'}
                                paddingRight={minorScale(1)}
                            >
                                <Icon color='blue' icon="ring"/>
                            </Pane>
                        : ''
                    }
                    {player.bets.odds === true ? 
                            <Pane key={player.name + '2'}
                                paddingRight={minorScale(1)}
                            >
                                <Icon color='green' icon="selection"/>
                            </Pane>
                        : ''
                    }

                </Pane>
                <Pane
                    // border='muted'
                    height='10%'
                    display='flex'
                    justifyContent='flex-end'

                >
                    <Text>Footer</Text>
                </Pane>
            </Pane>
            ))}

            {/* Add Player Button */}
            <Pane
                background='greenTint'
                border='muted'
                elevation={2}
                marginLeft={majorScale(1)}
                marginY={majorScale(1)}
                paddingTop={majorScale(1)}
                paddingX={majorScale(1)}
                width='5vw'
                height={paneHeight}
                float='left'
                display='flex'
                style={{ alignItems: 'center'}}
                justifyContent='center'
                
                onClick={(e) => {
                    crapsPlayers.push({
                        id: crapsPlayers.length,
                        name: 'Player ' + (crapsPlayers.length + 1),
                        selected: false,
                        money: 0,
                        bets: {}
                    })
                    props.onPlayersChange(crapsPlayers)
                }}
            >
                <Icon
                    icon='add'
                    color='green'
                    // onClick={(e) => {
                    //     e.stopPropagation()
                    //     crapsPlayers.splice(index,1)
                    //     props.onPlayersChange(crapsPlayers)
                    // }}
                />
            </Pane>
        </Pane>
    )
}

export default PlayerBar;