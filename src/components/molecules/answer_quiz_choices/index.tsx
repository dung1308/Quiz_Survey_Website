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

const Quiz_Answer_Choice: React.FC<any> = ({
  choices,
  setChoices,
  index,
  setAnswers,
  question,
}) => {
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
    // const currentAnswer = question.answer.find((a: string) => a === choices[index]);
    // const newChoice = event.target.value;
    // console.log(choices);
    // console.log("Choice:", choices[index]);
    // choices[index] = event.target.value;
    setAnswers(choices[no]);
    console.log(question.answer);
    // if (currentAnswer) {
    //   // update answer array with new choice
    //   // const answerIndex = answers.indexOf(currentAnswer);
    //   // answers[answerIndex] = event.target.value;
    //   setAnswers([newChoice]);
    //   console.log("Quiz Answers:", question.answer);
    // }
  };

  //   useEffect(() => {
  //     setErrorSave(isAnswersEmpty);
  //   }, [isAnswersEmpty, setErrorSave]);
  return (
    <FormControl>
      {/* {isAnswersEmpty && (
          <Typography variant="caption" color="error">
            Please choose your answer.
          </Typography>
        )} */}
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <FormControlLabel
          control={
            <Radio
              checked={choices[index] === question.answer[0]}
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
        <Box
          sx={{
            backgroundColor: "#f5f5f5",
            border: "1px solid gray",
            borderRadius: "5px",
            padding: "10px",
            marginBottom: "20px",
            width: "100%",
          }}
        >
          <Typography
            variant="body1"
            component="div"
            sx={{
              "& .Mui-disabled": {
                color: "gray",
                backgroundColor: "#f5f5f5",
                border: "1px solid gray",
                borderRadius: "5px",
                padding: "10px",
                marginBottom: "20px",
              },
            }}
          >
            {choices[index]}
          </Typography>
        </Box>
      </Box>
    </FormControl>
  );
};

export default Quiz_Answer_Choice;
