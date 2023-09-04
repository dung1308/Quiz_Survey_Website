import React, {useState, useRef, useEffect} from 'react';
import {Switch,Box, Button,Table, styled, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper} from '@mui/material';

interface State {
    time: number,
    seconds:number,
    minutes:number,
};

interface Props {
    time: number,
};

const Timer_Answer:React.FC<Props> = ({time}) => {
    const [timeState, setTimeState] = useState<State>({
        time,
        seconds:Math.floor((time-1)/60),
        minutes: time - Math.floor((time-1)/60) * 60 - 1,
    })
    useEffect(() => {
        setTimeout(() => {
            if (timeState.time === 0){
                return;
            }
        setTimeState({
            time: timeState.time -1,
            minutes: Math.floor((timeState.time-1)/60),
            seconds: timeState.time - Math.floor((timeState.time-1)/60) * 60 - 1,
        });
        }, 1000)
    }, [timeState.time]);
    return (
        <h2>{`${timeState.minutes}:${timeState.seconds < 10 ? `0${timeState.seconds}` : timeState.seconds}`}</h2>
    )
}

export default Timer_Answer;