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
} from "@mui/material";
import React, { useState } from "react";
import Quiz_Template from "../create_questions/quiz";
import Multi_Ans_Quiz_Template from "../create_questions/multiAnsQuiz";
import Type_Question_Template from "../create_questions/type_question";

const QuizCard: React.FC<any> = ({question, setQuestion}: any) => {

  
  const type = question.type;

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
              borderRadius: "5px",
              padding: "10px",
              marginBottom: "20px",
            }}
            defaultValue={question.question}
            value={question.question}
            onChange={(args) =>
              {setQuestion({ ...question, question: args.target.value });
              }

            }
          />

          {(() => {
            switch (type) {
              case "Quiz":
                return <Quiz_Template choices={question.choices}
                          question = {question}
                          setQuestion = {setQuestion}
                          setChoices={(ansChoices: any) => {
                            setQuestion({ ...question, choices: ansChoices });
                        }}/>;

              case "Type Answer":
                return <Type_Question_Template/>;

              case "Multi Answer Question":
                return <Multi_Ans_Quiz_Template choices={question.choices}
                          question = {question}
                          setQuestion = {setQuestion}
                          setChoices={(ansChoices: any) => {
                            setQuestion({ ...question, choices: ansChoices });
                        }}/>;
  
              default:
                return <p>Error</p>;
            }
          })()}
        </CardContent>
      </Card>
    </Box>
  );
};

export default QuizCard;
