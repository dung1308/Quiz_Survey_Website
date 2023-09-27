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

const Quiz_Template: React.FC<any> = ({
  choices,
  setChoices,
  setQuestion,
  setOnAnswerQuizCard,
  setErrorSave,
  setErrorStatesQuiz,
  errorStatesQuiz,
  handleChildError,
  question,
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
  const [loading, setLoading] = useState(false);
  const setAnswers = (editAnswer: any) => {
    setQuestion({ ...question, answer: editAnswer });
  };

  const handleRemoveChoice = (no: number) => {
    console.log(no);
    if (choices.length > 2) {
      setLoading(true);
      // question.answer.filter((e: any) => e !== choices[no]);

      console.log(choices[no]);
      choices.splice(no, 1);
      console.log(choices);
      setChoices(choices);
      console.log(choices);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleAddInput = () => {
    if (choices.length < 8) {
      // answers.push("");
      choices.push("");
      // setAnswers(answers);
      setChoices(choices);
    }

    // setAnswers((question:any) => {

    //     return question; // because you want updated state for anything watching for changes
    // });
    // setChoices(choices.push(''))
  };
  useEffect(() => {
    setErrorSave(errorStatesQuiz.some((state: any) => state));
  }, [errorStatesQuiz]);

  return (
    <FormControl component="fieldset">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <RadioGroup
          onChange={(args) => {
            setQuestion({ ...question, answer: [args.target.value] });
          }}
        >
          {choices.map((choice: string, index: number) => (
            <Quiz_Choice
              handleRemoveChoice={handleRemoveChoice}
              index={index}
              choices={choices}
              setAnswers={setOnAnswerQuizCard}
              setChoices={setChoices}
              setErrorSave={(isError: boolean) => {
                handleChildError(index, isError);
                setErrorStatesQuiz((prevStates: any) => {
                  const newStates = [...prevStates];
                  newStates[index] = isError;
                  return newStates;
                });
              }}
              answers={question.answer}
            />
          ))}
        </RadioGroup>
      )}
      {choices.length < 8 && (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        >
          <Button
            onClick={handleAddInput}
            sx={{
              backgroundColor: "#8d6e63",
              color: "#ffffff",
              border: "none",
              borderRadius: "5px",
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Add Input
          </Button>
        </Box>
      )}
    </FormControl>
  );
};

export default Quiz_Template;
