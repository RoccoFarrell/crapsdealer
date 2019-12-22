import React, { useState, useEffect, useRef } from 'react';
import { majorScale, Pane, Text, TextInput, Icon, IconButton, Heading, minorScale } from 'evergreen-ui';

import './BetsArea.css';

import img_chip from "../resources/chip.png";
import img_diceroll from "../resources/dices.png";

import img_onbutton from "../resources/onbutton.png";
import img_offbutton from "../resources/offbutton.png";

function BetsArea(props) {

    const [roll, setRoll] = useState(7)
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
    
    const rollHandler = () => {
        const min = 1;
        const max = 6;
        const tempRoll = Math.round(min + Math.random() * (max - min)) + Math.round(min + Math.random() * (max - min))
        setRoll(tempRoll)
        setRotate(true)
    }

    const bgColor = (bet) => {
        console.log(bet)
        console.log('returning' + ((bet.selected === true) ? 'yellow' : 'white'))
        return ((bet.selected === true) ? 'yellow' : 'white' )
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
                    size={800}
                    margin={majorScale(2)}
                >
                    {roll}
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
                            style={{filter: 'opacity(25%)'}}
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
                        />
                    </Pane>          
                </Pane>
            </Pane>

            {/* Bets Area */}
            <Pane
                display='flex'
                height='100%'
                width='65%'
                background='tealTint'
                elevation={2}
                alignItems='center'
                justifyContent='center'
            >
                {bets.map((bet, index) => (
                    <Pane
                        key={index}
                        display='flex'
                        flexDirection='column'
                        elevation={2}
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
                    </Pane>


                ))}
            </Pane>
        </Pane>
    )
}

export default BetsArea;