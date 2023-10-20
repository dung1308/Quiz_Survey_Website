import React from "react";
import {
  Box,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  Checkbox,
  Typography,
  FormControlLabel,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
// answerLabel, answer, value
const AnswerChoice: React.FC<any> = ({
  index,
  setQuestion,
  question,
  rightAnswers,
  questionIndex,
  hasAnswered,
}) => {
  const currentAnswer = rightAnswers[questionIndex].includes(
    question.choices[index]
  );
  // const currentAnswer = question.answer.find((a: string) => a === question.choices[index]);
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((checked) => !checked);
  };

  const handleChangeAnswer = (index: number) => {
    setChecked((checked: any) => !checked);
    if (!checked === true) {
      question.answer.push(question.choices[index]);
      setQuestion(question);
    } else if (!checked === false) {
      question.answer = question.answer.filter(
        (a: any) => a !== question.choices[index]
      );
      setQuestion(question);
    }
    console.log(question.answer);
  };

  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      {/* <FormControl variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">
          {answerLabel}
        </InputLabel>
        <Input disabled = {true}
          id="input-with-icon-adornment" value = {answer}
          startAdornment={
            <InputAdornment position="start">
              <Checkbox
                value={value}
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </InputAdornment>
          }
        /> */}
      {/* <FormControlLabel
            control={<Checkbox value={value}
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }} />}
            label={<Typography variant="body1">{answer}</Typography>}
    /> */}
      {/* </FormControl> */}
      <label
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        {currentAnswer && hasAnswered && <DoneIcon />}
        <Checkbox
          disabled={hasAnswered}
          checked={checked}
          inputProps={{ "aria-label": "controlled" }}
          onChange={() => handleChangeAnswer(index)}
          sx={{
            fontSize: { xs: "13px", md: "13px", mr: "18px", },
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
                // height: "2vw",
                overflow: "auto",
              },
            }}
          >
            {question.choices[index]}
          </Typography>
        </Box>
      </label>
    </Box>
  );
};

export default AnswerChoice;
