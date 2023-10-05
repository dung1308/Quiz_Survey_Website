import React, { useEffect } from "react";
import { Card, CardContent, Box, Button, Grid, TextField } from "@mui/material";
import FillAnswer from "../../../molecules/fillAnswer";

interface Props {
  question: string;
  answer: string;
  onAnswer: (answer: string) => void;
}

const Typing_Answer_Template: React.FC<any> = ({
  setQuestion,
  question,
  hasAnswered,
}) => {
  return (
    <TextField
      disabled={hasAnswered}
      placeholder={hasAnswered ? "" : "Fill in your answer"}
      multiline
      rows={8}
      maxRows={10}
      inputProps={{ minLength: 50 }}
      sx={{
        fontSize: "18px",
        fontWeight: "bold",
        color: "#8d6e63",
        textShadow: "1px 1px #ffffff",
        marginRight: "10px",
        paddingTop: "5px",
      }}
      onChange={(e: any) => {
        // const defaultValue = e.target.value === "" ? "..." : [e.target.value];
        // console.log(question.answer)
        setQuestion({ ...question, answer: e.target.value ?? "..." });
        console.log(question.answer);
      }}
    />
  );
};

export default Typing_Answer_Template;
