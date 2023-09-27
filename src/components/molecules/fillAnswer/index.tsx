import React, { useEffect } from "react";
import {
  Box,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  Checkbox,
  Typography,
} from "@mui/material";

const FillAnswer: React.FC<any> = ({
  answers,
  index,
  setAnswers,
  setChoices,
  setQuestion,
  question,
  setErrorSave
}) => {
  //     const [checked, setChecked] = React.useState(false);

  // const handleChangeAnswer = (event:React.ChangeEvent<HTMLInputElement>) => {
  //   setChecked(checked => !checked);
  //   if (checked===true){
  //     question.answer.push(event?.target.value);
  //     setQuestion(question);
  //   }
  //   else if (checked===false){
  //     question.answer = question.answer.filter((a) => a !== event?.target.value);
  //     setQuestion(question);
  //   }

  //   console.log(question.answer)
  // };
  // const handleChangeChoiceByID = (event:React.ChangeEvent<HTMLInputElement>, no:number) =>
  //       {

  //           setAnswers((answers:any) => {
  //               answers[index] = event.target.value;
  //               return [...answers]; // because you want updated state for anything watching for changes
  //           });
  //           setChoices(answers)
  //       }

  // return (
  //   <Box sx={{ '& > :not(style)': { m: 1 } }}>
  //     <FormControl variant="standard">
  //       <InputLabel htmlFor="input-with-icon-adornment">
  //         Answer {index+1}
  //       </InputLabel>
  //       <Input
  //         id="input-with-icon-adornment" placeholder="Fill in your answer"
  //         sx = {{ fontSize: '18px', fontWeight: 'bold', color: '#8d6e63', textShadow: '1px 1px #ffffff', marginRight: '10px', paddingTop: '5px' }}
  //         defaultValue = {`${answers[index]}`}
  //         onChange={(e:React.ChangeEvent<HTMLInputElement>)=>handleChangeChoiceByID(e,index)}
  //         startAdornment={
  //           <InputAdornment position="start">
  //             <Checkbox
  //               value={index}
  //               checked={checked}
  //               onChange={e => handleChangeAnswer(e)}
  //               inputProps={{ 'aria-label': 'controlled' }}

  //             />
  //           </InputAdornment>
  //         }
  //       />
  //     </FormControl>
  //   </Box>
  // );

  const [checked, setChecked] = React.useState(
    question.answer.includes(question.choices[index])
  );
  const [isChoiceEmpty, setIsChoiceEmpty] = React.useState(
    question.choices[index] === ""
  );

  const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isChoiceEmpty === true) {
      return;
    } else setChecked((checked: any) => !checked);
    if (!checked === true) {
      question.answer.push(question.choices[event?.target.value]);
      setQuestion(question);
    } else if (!checked === false) {
      question.answer = question.answer.filter(
        (a: any) => a !== question.choices[event?.target.value]
      );
      setQuestion(question);
    }
    console.log(question.answer);
  };

  const handleChangeChoiceByID = (
    event: React.ChangeEvent<HTMLInputElement>,
    no: any
  ) => {
    const currentAnswer = question.answer.find((a: string) => a === question.choices[index]);

    const newChoice = event.target.value;

    question.choices[index] = newChoice;
    setChoices(question.choices);
    setIsChoiceEmpty(question.choices[index] === "");
    if (currentAnswer) {
      // update answer array with new choice
      const answerIndex = question.answer.indexOf(currentAnswer);
      question.answer[answerIndex] = newChoice;
      setAnswers(answers)
    }
    console.log(question.choices);
    console.log(question.choices[index]);
  };

  // useEffect(() => {
  //   setErrorSave(isChoiceEmpty);
  // }, [isChoiceEmpty, setErrorSave]);

  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <FormControl variant="standard">
        {/* {isChoiceEmpty && (
        <Typography variant="caption" color="error">
          Please enter a choice.
        </Typography>
      )} */}
        <InputLabel htmlFor="input-with-icon-adornment" error={isChoiceEmpty}>
          {isChoiceEmpty ? "Fill in the choice" : `Answer ${index + 1}`}
        </InputLabel>
        <Input
          id="input-with-icon-adornment"
          placeholder="Fill in your answer"
          sx={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#8d6e63",
            textShadow: "1px 1px #ffffff",
            marginRight: "10px",
            paddingTop: "5px",
          }}
          defaultValue={`${question.choices[index]}`}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeChoiceByID(e, index)
          }
          startAdornment={
            <InputAdornment position="start">
              <Checkbox
                value={index}
                checked={checked}
                onChange={(e) => handleChangeAnswer(e)}
                inputProps={{ "aria-label": "controlled" }}
              />
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
};

export default FillAnswer;
