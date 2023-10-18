import React, { useState } from "react";
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
  Typography,
} from "@mui/material";

import { createTheme } from "@mui/material/styles";
import RemoveIcon from "@mui/icons-material/Remove";
import FillAnswer from "../../../molecules/fillAnswer";

interface Props {
  question: string;
  choices: string[];
  answer: string;
  onAnswer: (answer: string) => void;
}

const Multi_Ans_Quiz_Template: React.FC<any> = ({
  choices,
  setChoices,
  setQuestion,
  setErrorSave,
  question,
  setOnAnswerQuizCard,
}) => {
  // const theme = createTheme();
  // const [inputs, setInputs] = useState<{ label: string; value: number; placeholder: string; checked: boolean }[]>([{ label: '', value: 1, placeholder: '', checked: false }]);
  // const handleAddInput = () => {
  //     const newInput = { label: '', value: inputs.length + 1, placeholder: '', checked: false };
  //     const new_question = [
  //         {
  //             question: '',
  //             choices: [],
  //             type: '',
  //             answer: '',
  //         }
  //     ]
  //     setInputs([...inputs, newInput]);
  //     //answers_Quiz.push('');
  //     setData((data:any) => {
  //         data[index].choices.push('')
  //         return [...data]; // because you want updated state for anything watching for changes
  //     });
  // };

  // const handleChangeQuestion = (event:React.ChangeEvent<HTMLInputElement>) =>
  // {
  //     setData((data:any) => {
  //         data[index].question = event.target.value;
  //         return [...data]; // because you want updated state for anything watching for changes
  //     });
  // }

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
  // const handleRemoveChoice = (no:number) => {
  //     if (data[index].choices.length > 2)
  //     {
  //         setData((data:any) => {
  //             data[index].choices.splice(no, 1);
  //             return [...data];
  //         });

  //     }

  // };

  // const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const { id, checked } = event.target;
  //     if (checked) {
  //       setData((data:any) => {
  //         data[index].choices.splice(id, 1);
  //         return [...data];
  //     })
  //     }
  // };
  // const [answers, setAnswers] = useState(
  //   question.answers.map((choice: string) => String(choice))
  // );
  const [loading, setLoading] = useState(false);
  const [isChoiceNotDeletable, setIsChoiceNotDeletable] = React.useState(false);

  const setAnswers = (editAnswer: any) => {
    setQuestion({ ...question, answer: editAnswer });
  };

  const handleRemoveChoice = (no: number) => {
    // if (choices.length > 2) {
    //   setChoices((question: any) => {
    //     choices.splice(no, 1);
    //     return choices;
    //   });
    //   // setAnswers()
    //   setChoices(choices);
    // }
    if (choices.length > 2) {
      setLoading(true);
      console.log(no);
      choices.splice(no, 1);
      setChoices(choices);
      console.log(choices);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleAddInput = () => {
    // if (choices.length < 8) {
    //   choices.push("");
    //   setChoices(choices);
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

  return (
    <List>
      {isChoiceNotDeletable && (
        <Typography variant="caption" color="secondary">
          Please deselect the current choice to remove it
        </Typography>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        choices.map((choice: string, index: number) => (
          <ListItem key={index}>
            <FillAnswer
              answers={question.answer}
              index={index}
              setAnswers={setOnAnswerQuizCard}
              setChoices={setChoices}
              setQuestion={setQuestion}
              question={question}
              setErrorSave={setErrorSave}
            />

            <Button
              // onClick={() => handleRemoveChoice(index)}
              onClick={() => {
                const currentAnswer = question.answer.find(
                  (a: string) => a === choices[index]
                );
                if (!currentAnswer) {
                  setIsChoiceNotDeletable(false);
                  handleRemoveChoice(index);
                } else setIsChoiceNotDeletable(true);
              }}
              sx={{
                backgroundColor: "secondary.main",
                color: "white",
                marginRight: "10px",
                borderRadius: 30,
              }}
            >
              <RemoveIcon />
            </Button>
          </ListItem>
        ))
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
    </List>
  );
};

export default Multi_Ans_Quiz_Template;
