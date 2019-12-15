import React from 'react';
import { Pane, Text } from 'evergreen-ui';

function PlayerBar(props) {
    let crapsPlayers = props.players
    let bgColor = (player) => {
        return ((player.selected === true) ? 'lightyellow' : 'lightblue' )
    }

    return (
        <Pane clearfix width='100%'>
            {crapsPlayers.map((player, index) => (
            <Pane key={index}
                // is="section"
                // innerRef={(ref) => console.log(ref)}
                background={bgColor(crapsPlayers[index])}
                border="muted"
                elevation={2}
                marginLeft={12}
                marginY={24}
                paddingTop={5}
                paddingX={5}
                width={ (75 / crapsPlayers.length) + 'vw' }
                height='20vh'
                float='left'
                onClick={(e) => {
                    crapsPlayers[index].selected = (crapsPlayers[index].selected === true ? false : true)
                    props.onPlayersChange(crapsPlayers)
                }}
            >
                <Text>{player.name}</Text>
            </Pane>
            ))}
            <Pane
                // innerRef={(ref) => console.log(ref)}
                background='lightgreen'
                border="muted"
                elevation={2}
                marginLeft={12}
                marginY={24}
                paddingTop={5}
                paddingX={5}
                width='10vw'
                height='20vh'
                float='left'
                onClick={(e) => {
                    crapsPlayers.push({
                        id: crapsPlayers.length,
                        name: 'Player ' + (crapsPlayers.length + 1),
                        selected: false
                    })
                    props.onPlayersChange(crapsPlayers)
                }}
            >
                <Text>Add Player</Text>
            </Pane>
        </Pane>
    )
}

export default PlayerBar;