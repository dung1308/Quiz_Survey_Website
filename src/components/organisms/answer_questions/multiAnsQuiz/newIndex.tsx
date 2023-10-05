import React, { useState } from "react";
import {
  Typography,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  Input,
  InputAdornment,
  RadioGroup,
  Card,
  CardContent,
  Box,
  Button,
  Grid,
  TextField,
  List,
  ListItem,
} from "@mui/material";
import AnswerChoice from "../../../molecules/answer_choices";

import { createTheme } from "@mui/material/styles";

interface Props {
  question: string;
  choices: string[];
  answer: string;
  onAnswer: (answer: string) => void;
}

const Multi__Type_For_Answer: React.FC<any> = ({
  choices,
  setQuestion,
  question,
  setOnAnswerQuizCard,
  rightAnswers,
  questionIndex,
  hasAnswered,
}) => {
  const setAnswers = (editAnswer: any) => {
    setQuestion({ ...question, answer: editAnswer });
  };

  return (
    <List>
      {choices.map((choice: string, index: number) => (
        <ListItem key={index}>
          <AnswerChoice
            // answers={question.answer}
            index={index}
            // setAnswers={setAnswers}
            // setChoices={setChoices}
            setQuestion={setQuestion}
            question={question}
            rightAnswers={rightAnswers}
            questionIndex={questionIndex}
            hasAnswered = {hasAnswered}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default Multi__Type_For_Answer;
