import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  fabClasses,
} from "@mui/material";
import React, { useState, useEffect, useMemo } from "react";
import Quiz_Template from "../create_questions/quiz";
import Multi_Ans_Quiz_Template from "../create_questions/multiAnsQuiz";
import Type_Question_Template from "../create_questions/type_question";

const QuizCard: React.FC<any> = ({
  question,
  setErrorSave,
  setQuestion,
  askOrAnswer,
}: any) => {
  const type = question.type;

  const [onAnswerQuiz, setOnAnswerQuiz] = React.useState([""]);

  const [onAnswerMulti, setOnAnswerMulti] = React.useState([""]);

  const [onAnswerTyping, setOnAnswerTyping] = React.useState([""]);

  const [isQuestionEmpty, setIsQuestionEmpty] = React.useState(
    question.question === ""
  );
  const [errorStatesQuiz, setErrorStatesQuiz] = useState(
    Array(question.choices.length).fill(false)
  );
  const setOnAnswerQuizCard = (answers: any) => {
    if (question.type === "Quiz") {
      setOnAnswerQuiz(answers);
      setQuestion({ ...question, answer: onAnswerQuiz });
      console.log("Answers Quiz", onAnswerQuiz);
    } else if (question.type === "Type Answer") {
      setOnAnswerTyping(answers);
      setQuestion({ ...question, answer: onAnswerTyping });
      console.log("Answers Type", onAnswerTyping);
    } else if (question.type === "Multi Answer Question") {
      setOnAnswerMulti(answers);
      setQuestion({ ...question, answer: onAnswerMulti });
      console.log("Answers Multi", onAnswerMulti);
    }
  };

  const setErrorSaveQuizCard = (valid: any) => {};
  const handleChildError = (index: number, isError: boolean) => {
    setErrorStatesQuiz((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = isError;
      return newStates;
    });
  };

  const errorMemo = React.useMemo(() => {
    if (!isQuestionEmpty && question.type === "Type Answer") return false;
    else if (question.type === "Quiz")
      return isQuestionEmpty || errorStatesQuiz.some((state) => state);
  }, [isQuestionEmpty, errorStatesQuiz, question.type]);

  React.useEffect(() => {
    setErrorSave(errorMemo);
  }, [errorMemo, setErrorSave]);

  useEffect(() => {
    const hasEmptyAnswer =
      question.answer.length === 1 && question.answer[0] === "";
    if (question.type === "Quiz") {
      setErrorSave(
        isQuestionEmpty ||
          errorStatesQuiz.some((state) => state) ||
          hasEmptyAnswer
      );
    }
    if (!isQuestionEmpty && question.type === "Type Answer")
      setErrorSave(false);
  }, [isQuestionEmpty, errorStatesQuiz, question.answer, question.type]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        textAlign: "-webkit-center",
      }}
    >
      <Card
        className="custom-card"
        sx={{
          backgroundImage: `url('https://www.transparenttextures.com/patterns/leather.png')`,
          backgroundColor: "#f5deb3",
          border: 2,
          borderColor: "#8d6e63",
          borderRadius: "10px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
          padding: "20px",
          width: "95%",
        }}
      >
        <CardContent>
          {isQuestionEmpty && (
            <Typography variant="caption" color="error">
              Please fill in the question.
            </Typography>
          )}
          {/* <FormControl fullWidth sx={{ backgroundColor: "#FFFFFF" }}>
            <InputLabel
              id="demo-simple-select-label"
              color="primary"
              sx={{ fontWeight: "bold", color: "#000000" }}
            >
              {"Quiz Type"}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="question type"
              // onChange={(event) => handleChange(slideIndex, event)}
              sx={{
                backgroundColor: "#FFFFFF",
                fontSize: "1rem",
                fontWeight: "bold",
                paddingRight: "20px",
              }}
            >
              <MenuItem
                value={"Quiz"}
                sx={{
                  backgroundColor: "#FFFFFF",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                Quiz
              </MenuItem>
              <MenuItem
                value={"Type Answer"}
                sx={{
                  backgroundColor: "#FFFFFF",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                Type Answer
              </MenuItem>
              <MenuItem
                value={"Multi Answer Question"}
                sx={{
                  backgroundColor: "#FFFFFF",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                Multi Answer Question
              </MenuItem>
            </Select>
          </FormControl> */}
          <TextField
            label="Question"
            variant="outlined"
            fullWidth
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#8d6e63",
              textShadow: "1px 1px #ffffff",
              backgroundColor: "#ffffff",
              border: "2px solid #8d6e63",
              borderRadius: "2vh",
              padding: "10px",
              marginBottom: "20px",
            }}
            defaultValue={question.question}
            value={question.question}
            onChange={(args) => {
              setQuestion({ ...question, question: args.target.value });
              setIsQuestionEmpty(args.target.value === "");
            }}
          />

          {(() => {
            switch (type) {
              case "Quiz":
                return (
                  <Quiz_Template
                    choices={question.choices}
                    question={question}
                    setQuestion={setQuestion}
                    setErrorSave={setErrorSave}
                    setChoices={(ansChoices: any) => {
                      setQuestion({ ...question, choices: ansChoices });
                    }}
                    setOnAnswerQuizCard={setOnAnswerQuizCard}
                    setErrorStatesQuiz={setErrorStatesQuiz}
                    errorStatesQuiz={errorStatesQuiz}
                    handleChildError={handleChildError}
                  />
                );

              case "Type Answer":
                return <Type_Question_Template />;

              case "Multi Answer Question":
                return (
                  <Multi_Ans_Quiz_Template
                    choices={question.choices}
                    question={question}
                    setQuestion={setQuestion}
                    setErrorSave={setErrorSave}
                    setChoices={(ansChoices: any) => {
                      setQuestion({ ...question, choices: ansChoices });
                    }}
                    setOnAnswerQuizCard={setOnAnswerQuizCard}
                  />
                );

              default:
                return <p>Choose a question type</p>;
            }
          })()}
        </CardContent>
      </Card>
    </Box>
  );
};

export default QuizCard;
