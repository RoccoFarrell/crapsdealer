import React, { useState } from 'react';
import { majorScale, minorScale, Pane, Text, Heading, TextInput, Icon, IconButton, Switch, Pill } from 'evergreen-ui';

function PlayerBar(props) {
    let crapsPlayers = props.players
    let minBet = props.minBet
    let debugMode = props.debugMode

    let bgColor = (player) => {
        return ((player.selected === true) ? 'yellow' : 'tealTint' )
    }

    let [settingsPaneShow, setSettingsPaneShow] = useState(false)

    let paneHeight = '40vh'

    const [editLock, setEditLock] = useState(false)

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
                    <IconButton
                        icon='settings'
                        color='muted'
                        marginX={minorScale(1)}
                        onClick={(e) => {
                            e.stopPropagation()
                            setSettingsPaneShow(!settingsPaneShow)
                        }}
                    />
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
                    <IconButton
                        icon='trash'
                        intent='danger'
                        marginX={minorScale(1)}
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                    />
            </Pane>

            {/* Settings Pane */}

            { settingsPaneShow ? (
                <Pane
                    display='flex'
                    height={paneHeight}
                    margin={majorScale(1)}
                    padding={majorScale(1)}
                    justifyContent='space-evenly'
                    alignItems='center'
                    flexDirection='column'
                    clearfix
                >
                    <Text>Min Bet</Text>
                    <TextInput
                        width={100}
                        onChange={e => {
                            minBet = e.target.value
                            props.onMinBetChange(minBet)
                        }}
                        onClick={e => e.stopPropagation()}
                        value={minBet}
                    />

                    <Text>Debug</Text>
                    <Switch
                        checked={debugMode}
                        onChange={e => props.onDebugChange()}
                    ></Switch>
                </Pane>
            ) : (<div></div>)
            }
            
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
                            <Heading size={400}>{player.name}</Heading>
                            <Heading size={700} color='green'>${player.money}</Heading>
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
                    {player.bets.pass.enabled === true ? 
                            <Pane 
                                height={majorScale(3)}
                                key={player.name + '1'}
                                paddingRight={minorScale(1)}
                                display='flex'
                                alignItems='center'
                            >
                                <Icon color="gold" icon="ring"/>
                                <Pill color="green" display="inline-flex" margin={4}>${player.bets.pass.count * minBet}</Pill>
                            </Pane>
                        : ''
                    }
                    {player.bets.odds.enabled === true ? (
                            <Pane 
                                
                                key={player.name + '2'}
                                height={majorScale(3)}
                                paddingRight={minorScale(1)}
                                display='flex'
                                alignItems='center'
                            >
                                <Icon color="purple" icon="selection"/>
                                <Pill color="green" display="inline-flex" margin={4}>${player.bets.odds.count * minBet}</Pill>
                            </Pane>
                        ) : ''
                    }

                </Pane>
                <Pane
                    // border='muted'
                    height='10%'
                    display='flex'
                    justifyContent='flex-end'

                >
                    {/* <Text>Footer</Text> */}
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
                    props.addPlayer('Player ' + (crapsPlayers.length + 1))
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