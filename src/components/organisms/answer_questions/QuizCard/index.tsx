import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  fabClasses,
} from "@mui/material";
import React, { useState, useEffect, useMemo } from "react";
import Quiz_Answer from "../quiz";
import Type_Answer from "../type_question";
import Multi_Ans_Quiz_Answer from "../multiAnsQuiz";
import Multi__Type_For_Answer from "../multiAnsQuiz";
import Quiz_Type_Answer from "../quiz";
import Typing_Answer_Template from "../type_question";
//   import Quiz_Template from "../create_questions/quiz";
//   import Multi_Ans_Quiz_Template from "../create_questions/multiAnsQuiz";
//   import Type_Question_Template from "../create_questions/type_question";

const QuizCard_Answer: React.FC<any> = ({
  question,
  questionIndex,
  rightAnswers,
  setQuestion,
  hasAnswered,
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
          width: "100vh",
          "@media (max-width: 1700px)": {
            width: "100vw",
            // height: "60vw"
          },
        }}
      >
        <CardContent>
          {isQuestionEmpty && (
            <Typography variant="caption" color="error">
              Please fill in the question.
            </Typography>
          )}
          <Typography
            sx={{
              fontSize: "1vw",
              fontWeight: "bold",
              color: "#8d6e63",
              textShadow: "1px 1px #ffffff",
              backgroundColor: "#ffffff",
              border: "2px solid #8d6e63",
              borderRadius: "5px",
              padding: "10px",
              // height: "1vw",
              marginBottom: "20px",
              // "@media (max-width: 1700px)": {
              //   fontSize: "1vw",
              //   height: "5vw",
              //   overflow: "auto",
              // },
              "@media (max-width: 601px)": {
                fontSize: "1vw",
                height: "5vw",
                overflow: "auto",
              },
              // "@media (min-width: 601px)": {
              //   fontSize: "10px",
              // },
            }}
          >
            {question.question}
          </Typography>

          {(() => {
            switch (type) {
              case "Quiz":
                // return <Quiz_Answer/>
                return (
                  <Quiz_Type_Answer
                    choices={question.choices}
                    setQuestion={setQuestion}
                    question={question}
                    rightAnswers={rightAnswers}
                    questionIndex={questionIndex}
                    hasAnswered={hasAnswered}
                  />
                );
              case "Type Answer":
                // return <Type_Answer/>
                return (
                  <Typing_Answer_Template
                    setQuestion={setQuestion}
                    question={question}
                    rightAnswers={rightAnswers}
                    hasAnswered={hasAnswered}
                  />
                );
              case "Multi Answer Question":
                // return <Multi_Ans_Quiz_Answer/>
                return (
                  <Multi__Type_For_Answer
                    choices={question.choices}
                    setQuestion={setQuestion}
                    question={question}
                    questionIndex={questionIndex}
                    rightAnswers={rightAnswers}
                    hasAnswered={hasAnswered}
                    setChoices={(ansChoices: any) => {
                      setQuestion({ ...question, choices: ansChoices });
                    }}
                  />
                );

              // case "Quiz":
              //   return (
              //     <Quiz_Template
              //       choices={question.choices}
              //       question={question}
              //       setQuestion={setQuestion}
              //       setErrorSave={setErrorSave}
              //       setChoices={(ansChoices: any) => {
              //         setQuestion({ ...question, choices: ansChoices });
              //       }}
              //       setOnAnswerQuizCard = {setOnAnswerQuizCard}
              //       setErrorStatesQuiz={setErrorStatesQuiz}
              //       errorStatesQuiz={errorStatesQuiz}
              //       handleChildError={handleChildError}
              //     />
              //   );

              // case "Type Answer":
              //   return <Type_Question_Template/>;

              // case "Multi Answer Question":
              //   return (
              //     <Multi_Ans_Quiz_Template
              //       choices={question.choices}
              //       question={question}
              //       setQuestion={setQuestion}
              //       setErrorSave={setErrorSave}
              //       setChoices={(ansChoices: any) => {
              //         setQuestion({ ...question, choices: ansChoices });
              //       }}
              //       setOnAnswerQuizCard = {setOnAnswerQuizCard}
              //     />
              //   );

              default:
                return <p>Choose a question type</p>;
            }
          })()}
        </CardContent>
      </Card>
    </Box>
  );
};

export default QuizCard_Answer;
