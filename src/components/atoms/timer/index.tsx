import React, { useState, useRef, useEffect } from "react";
import {
  Switch,
  Box,
  Button,
  Table,
  styled,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface State {
  time: number;
  seconds: number;
  minutes: number;
  hours: number;
}

interface Props {
  time: number;
  overTime: any;
  setOverTime: any;
}

const Timer_Answer: React.FC<Props> = ({ time, overTime, setOverTime }) => {
  const [timeState, setTimeState] = useState<State>({
    time,
    seconds: Math.floor((time - 1) % 60),
    minutes: Math.floor((time - 1) / 60) % 60,
    hours: Math.floor((time - 1) / 3600),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeState.time === 0) {
        return;
      }
      setTimeState((prevState) => ({
        time: prevState.time - 1,
        seconds: Math.floor((prevState.time - 1) % 60),
        minutes: Math.floor((prevState.time - 1) / 60) % 60,
        hours: Math.floor((prevState.time - 1) / 3600),
      }));
    }, 1000);
    if (timeState.time === 0) setOverTime(true);

    return () => clearTimeout(timer);
  }, [timeState.time]);

  return (
    <h1 style={{ fontSize: "1.5vw" }}>
      {`${timeState.hours.toString()}:${
        timeState.minutes < 10
          ? `0${timeState.minutes.toString()}`
          : timeState.minutes.toString()
      }:${
        timeState.seconds < 10
          ? `0${timeState.seconds.toString()}`
          : timeState.seconds.toString()
      }`}
    </h1>
  );
};

export default Timer_Answer;
