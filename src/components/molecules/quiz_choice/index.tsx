import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Input,
  Radio,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import { error } from "console";

const Quiz_Choice: React.FC<any> = ({
  choices,
  setChoices,
  index,
  handleRemoveChoice,
  setAnswers,
  answers,
  setErrorSave,
}) => {
  const [isChoiceEmpty, setIsChoiceEmpty] = React.useState(
    choices[index] === ""
  );
  const [isContainAnswer, setIsContainAnswer] = React.useState(
    false
  );
  const [isDuplicateChoice, setIsDuplicateChoice] = React.useState(false);
  
  useEffect(() => {
    setErrorSave(isChoiceEmpty || isDuplicateChoice);
  }, [isChoiceEmpty, isDuplicateChoice, setErrorSave]);
  // useEffect(() => {
  //   console.log(choices.filter(
  //     (choice: string, i: number) => i !== index && choice === choices[index]
  //   ))
  //   setIsDuplicateChoice(
  //     choices.filter(
  //       (choice: string, i: number) => i !== index && choice === choices[index]
  //     ).length > 0
  //   );
  // }, [choices, index]);
  
  //   const [isAnswersEmpty, setIsAnswerEmpty] = React.useState(
  //     answers.length === 1 && answers[0] === ""
  //   );
  // const [isAnswersEmpty, setIsAnswerEmpty] = React.useState(
  //   answers.length === 0
  // );
  const handleChangeChoiceByID = (
    event: React.ChangeEvent<HTMLInputElement>,
    no: any
  ) => {
    const currentAnswer = answers.find((a: string) => a === choices[index]);
    const newChoice = event.target.value;
    console.log(choices)
    console.log("Choice:",choices[index])
    choices[index] = event.target.value;
    setChoices(choices);
    if (currentAnswer) {
      // update answer array with new choice
      // const answerIndex = answers.indexOf(currentAnswer);
      // answers[answerIndex] = event.target.value;
      setAnswers([newChoice])
      console.log("Quiz Answers:", answers)
    }
    
    setIsChoiceEmpty(event.target.value === "");
    setIsDuplicateChoice(
      choices.filter(
        (choice: string, i: number) => i !== index && choice === choices[index]
      ).length > 0
    );
  };

  //   useEffect(() => {
  //     setErrorSave(isAnswersEmpty);
  //   }, [isAnswersEmpty, setErrorSave]);
  return (
    <FormControl>
      {isChoiceEmpty && (
        <Typography variant="caption" color="error">
          Please enter a choice.
        </Typography>
      )}
      {isDuplicateChoice && (
        <Typography variant="caption" color="error">
          This choice is a duplicate.
        </Typography>
      )}
      {/* {isAnswersEmpty && (
        <Typography variant="caption" color="error">
          Please choose your answer.
        </Typography>
      )} */}
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <FormControlLabel
          control={
            <Radio
              checked={!isDuplicateChoice && !isChoiceEmpty && choices[index] === answers[0]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeChoiceByID(e, index)
              }
            />
          }
          label=""
          value={choices[index]}
          sx={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#8d6e63",
            textShadow: "1px 1px #ffffff",
            marginRight: "10px",
            paddingTop: "5px",
          }}
        />
        <Input
          defaultValue={`${choices[index]}`}
          placeholder={`Input ${index + 1}`}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeChoiceByID(e, index)
          }
        />
        <Button
          onClick={() => handleRemoveChoice(index)}
          sx={{
            backgroundColor: "secondary.main",
            color: "white",
            marginRight: "10px",
            borderRadius: 30,
          }}
        >
          <RemoveIcon />
        </Button>
      </Box>
    </FormControl>
  );
};

export default Quiz_Choice;
