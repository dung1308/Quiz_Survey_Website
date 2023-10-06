import React, { useState, useEffect } from "react";
import {
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
import FillAnswer from "../../../molecules/fillAnswer";
import { createTheme } from "@mui/material/styles";
import RemoveIcon from "@mui/icons-material/Remove";
import Quiz_Choice from "../../../molecules/quiz_choice";
import Quiz_Answer_Choice from "../../../molecules/answer_quiz_choices";

const Quiz_Type_Answer: React.FC<any> = ({
  choices,
  setChoices,
  setQuestion,
  setOnAnswerQuizCard,
  question,
  rightAnswers,
  questionIndex,
  hasAnswered,
}: any) => {
  // const [answers_Quiz, setAnswers_Quiz] = useState(answers);

  // const handleChangeChoiceByID = (event:React.ChangeEvent<HTMLInputElement>, no:number) =>
  // {

  //     setData((data:any) => {
  //         data[index].choices[no] = event.target.value;
  //         return [...data]; // because you want updated state for anything watching for changes
  //     });
  // }

  // const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setData((data:any) => {
  //         data[index].answer = event.target.value;
  //         return [...data]; // because you want updated state for anything watching for changes
  //     });
  // };
  // const [answers, setAnswers] = useState(
  //   question.answer.map((choice: string) => String(choice))
  // );
  //   const [loading, setLoading] = useState(false);
  const setAnswers = (editAnswer: any) => {
    setQuestion({ ...question, answer: editAnswer });
  };

  //   const handleRemoveChoice = (no: number) => {
  //     console.log(no);
  //     if (choices.length > 2) {
  //       setLoading(true);
  //       // question.answer.filter((e: any) => e !== choices[no]);

  //       console.log(choices[no]);
  //       choices.splice(no, 1);
  //       console.log(choices);
  //       setChoices(choices);
  //       console.log(choices);
  //       setTimeout(() => {
  //         setLoading(false);
  //       }, 1000);
  //     }
  //   };

  //   const handleAddInput = () => {
  //     if (choices.length < 8) {
  //       // answers.push("");
  //       choices.push("");
  //       // setAnswers(answers);
  //       setChoices(choices);
  //     }
  //   };
  //   useEffect(() => {
  //     setErrorSave(errorStatesQuiz.some((state: any) => state));
  //   }, [errorStatesQuiz]);

  return (
    <FormControl component="fieldset">
      <RadioGroup
        onChange={(args) => {
          setQuestion({ ...question, answer: [args.target.value] });
        }}
      >
        {choices.map((choice: string, index: number) => (
          <Quiz_Answer_Choice
            index={index}
            choices={choices}
            setAnswers={setAnswers}
            setChoices={setChoices}
            question={question}
            rightAnswers={rightAnswers}
            questionIndex={questionIndex}
            hasAnswered={hasAnswered}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default Quiz_Type_Answer;
