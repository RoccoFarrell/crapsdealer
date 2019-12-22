import React, { useState, useEffect, useRef } from 'react';
import { majorScale, Pane, Text, TextInput, Icon, IconButton, Heading } from 'evergreen-ui';

import './BetsArea.css';

import img_chip from "../resources/chip.png";
import img_diceroll from "../resources/dices.png";

function BetsArea(props) {

    const [roll, setRoll] = useState(7)
    const [rotate, setRotate] = useState(false)
    const imageRef = useRef(null)

    let rollHandler = () => {
        const min = 1;
        const max = 6;
        let tempRoll = Math.round(min + Math.random() * (max - min)) + Math.round(min + Math.random() * (max - min))
        // console.log(tempRoll)
        setRoll(tempRoll)
        setRotate(true)
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
        >
            <Pane
                display='flex'
                height='90%'
                width='20%'
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
            <Pane
                display='flex'
                height='100%'
                width='80%'
                
                alignItems='center'
                justifyContent='center'
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
            </Pane>
        </Pane>
    )
}

export default BetsArea;