import React, { useEffect } from "react";
import { Card, CardContent, Box, Button, Grid, TextField } from "@mui/material";
import FillAnswer from "../../../molecules/fillAnswer";

interface Props {
  question: string;
  answer: string;
  onAnswer: (answer: string) => void;
}

const Typing_Answer_Template: React.FC<any> = ({ setQuestion, question }) => {
  return (
    <TextField
      placeholder="Fill in your answer"
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
        setQuestion({ ...question, answer: [e.target.value] });
        console.log(question.answer)
      }}
    />
  );
};

export default Typing_Answer_Template;
