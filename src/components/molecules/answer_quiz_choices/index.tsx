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
import { Console, error } from "console";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

const Quiz_Answer_Choice: React.FC<any> = ({
  choices,
  setChoices,
  index,
  setAnswers,
  question,
  rightAnswers,
  questionIndex,
  hasAnswered,
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
  // const currentAnswer = question.answer.find(choices[index]);
  // const currentAnswer = rightAnswers[0].some((element: any) => {
  //   if (element === choices[index]) {
  //     return true;
  //     console.log(true)
  //   }

  //   return false;
  //   // console.log(rightAnswers)
  //   // console.log(choices[index])
  // });

  const currentAnswer = rightAnswers[questionIndex].includes(choices[index]);

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
    // console.log(question.answer);
    console.log(rightAnswers[0]);
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
        {currentAnswer && hasAnswered && <DoneIcon />}
        <FormControlLabel
          control={
            <Radio
              disabled={hasAnswered}
              checked={choices[index] === question.answer[0]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeChoiceByID(e, index)
              }
            />
          }
          label=""
          value={choices[index]}
          sx={{
            fontSize: { xs: "13px", md: "13px", mr: "18px", },
            // fontSize: "1vw",
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
              fontSize: { xs: "13px", md: "13px", mr: "18px", },
              // fontSize: "1vw",
              overflow: "auto",
              "& .Mui-disabled": {
                color: "gray",
                backgroundColor: "#f5f5f5",
                border: "1px solid gray",
                borderRadius: "5px",
                padding: "10px",
                marginBottom: "20px",
              },
              "@media (max-width: 601px)": {
                fontSize: { xs: "13px", md: "13px", mr: "18px", },
                // fontSize: "1vw",
                // height: "15px",
                overflow: "auto",
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
