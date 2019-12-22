import React from 'react';
import { majorScale, Pane, Text, TextInput, Icon, IconButton } from 'evergreen-ui';

function PlayerBar(props) {
    let crapsPlayers = props.players
    let bgColor = (player) => {
        return ((player.selected === true) ? 'yellow' : 'tealTint' )
    }
    let paneHeight = '40vh'

    return (
        <Pane clearfix width='100%'>
            {crapsPlayers.map((player, index) => (
            <Pane key={index}
                // is="section"
                // innerRef={(ref) => console.log(ref)}
                background={bgColor(crapsPlayers[index])}
                border="muted"
                elevation={2}
                marginX={majorScale(1)}
                marginY={majorScale(2)}
                paddingTop={majorScale(1)}
                paddingX={majorScale(1)}
                width={ (majorScale(10) / crapsPlayers.length) + 'vw' }
                height={paneHeight}
                float='left'
                onClick={(e) => {
                    // console.log('attempting to select index' + index)
                    crapsPlayers[index].selected = (crapsPlayers[index].selected === true ? false : true)
                    props.onPlayersChange(crapsPlayers)
                }}
            >
                
                <Pane
                    paddingBottom={majorScale(1)}
                >
                    <Text>{player.name}</Text>
                </Pane>
                <Pane
                    //border='muted'
                    height='75%'
                >
                    <Pane
                        style={{ alignself: 'flex-end'}}
                    >
                        <TextInput
                            width={majorScale(6)}
                            onChange={e => {
                                crapsPlayers[index].money = e.target.value
                                props.onPlayersChange(crapsPlayers)
                                console.log(crapsPlayers[index])
                            }}
                            onClick={e => e.stopPropagation()}
                            value={crapsPlayers[index].money}
                        />
                    </Pane>
                </Pane>
                <Pane
                    // border='muted'
                    height='10%'
                    display='flex'
                    justifyContent='flex-end'

                >
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
            </Pane>
            ))}

            {/* Add Player Button */}
            <Pane
                background='greenTint'
                border='muted'
                elevation={2}
                marginLeft={majorScale(2)}
                marginY={majorScale(2)}
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
                        money: 0
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