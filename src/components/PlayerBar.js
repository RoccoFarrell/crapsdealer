import React from 'react';
import { Pane, Text, Icon, IconButton } from 'evergreen-ui';

function PlayerBar(props) {
    let crapsPlayers = props.players
    let bgColor = (player) => {
        return ((player.selected === true) ? 'lightyellow' : 'lightblue' )
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
                marginX={5}
                marginY={24}
                paddingTop={10}
                paddingX={10}
                width={ (80 / crapsPlayers.length) + 'vw' }
                height={paneHeight}
                float='left'
                onClick={(e) => {
                    console.log('attempting to select index' + index)
                    crapsPlayers[index].selected = (crapsPlayers[index].selected === true ? false : true)
                    props.onPlayersChange(crapsPlayers)
                }}
            >
                
                <Pane
                    paddingBottom={10}
                ><Text>{player.name}</Text></Pane>
                <Pane
                    //border='muted'
                    height='75%'
                >
                    <Pane
                        style={{ alignself: 'flex-end'}}
                    >
                        Test
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
                            console.log('attempting to delete index ' + index)
                            e.stopPropagation()
                            crapsPlayers.splice(index,1)
                            props.onPlayersChange(crapsPlayers)
                        }}
                        //color={bgColor(crapsPlayers[index])}
                    />
                </Pane>
            </Pane>
            ))}

            {/* Add Player Button */}
            <Pane
                background='lightgreen'
                border="muted"
                elevation={2}
                marginLeft={12}
                marginY={24}
                paddingTop={5}
                paddingX={5}
                width='5vw'
                height={paneHeight}
                float='left'
                display='flex'
                style={{ alignItems: 'center'}}
                
                onClick={(e) => {
                    crapsPlayers.push({
                        id: crapsPlayers.length,
                        name: 'Player ' + (crapsPlayers.length + 1),
                        selected: false
                    })
                    props.onPlayersChange(crapsPlayers)
                }}
            >
                <Text
                    height='100px'
                >
                    Add Player
                </Text>
            </Pane>
        </Pane>
    )
}

export default PlayerBar;