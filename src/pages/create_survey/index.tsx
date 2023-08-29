import React from "react";
import Layout from "../../components/templates/layout";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Container,
  CssBaseline,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  Select,
  Button,
} from "@mui/material";

import SliderComponent from "../../components/organisms/create_questions/page_slider";
import Quiz_Template from "../../components/organisms/create_questions/quiz";
import Type_Question from "../../components/organisms/create_questions/type_question";
import Multi_Ans_Quiz_Template from "../../components/organisms/create_questions/multiAnsQuiz";
import { useNavigate, useParams } from "react-router-dom";
import QuizCard from "../../components/organisms/QuizCard";

interface Slide {
  question: string;
  choices: string[];
  type: string;
  answer: string[];
}

export const questions_test = [
  {
    no: 1,
    question: "",
    choices: ["", "", "", ""],
    type: "Quiz",
    answer: "",
  },
];
const questions = [
  {
    no: 1,
    question: "What is the capital of France?",
    choices: ["Paris", "London", "New York"],
    type: "Quiz",
    answer: "Paris",
  },
  {
    no: 2,
    question: "What is the largest planet in our solar system?",
    choices: ["Mars", "Jupiter", "Venus"],
    type: "Quiz",
    answer: "Jupiter",
  },
  {
    no: 3,
    question: "What is the boiling point of water?",
    choices: ["100°C", "0°C", "50°C"],
    type: "Quiz",
    answer: "100°C",
  },
  {
    no: 4,
    question: "What is the largest planet in our solar system?",
    choices: ["Mars", "Jupiter", "Venus"],
    type: "Quiz",
    answer: ["Jupiter"],
  },
  {
    no: 5,
    question: "What is the boiling point of water?",
    type: "Type Answer",
  },
  {
    no: 6,
    question: "What is the largest planet in our solar system?",
    choices: ["Mars", "Jupiter", "Venus", "Earth"],
    type: "Multi Answer Question",
    answer: "Jupiter",
  },
];
//const slides = questions_test.map(x=>({no: x.no, question: x.question, choices:x.choices, type: x.type, answer:x.answer}))
//const slides = questions.map(x=>({no: x.no, type: x.question}))

const CreateSurvey: React.FC<any> = () => {
  //get ID from URL
  const params = useParams();
  console.log(params.surveyId);

  //Router
  const navigate = useNavigate();
  const handleSave = () => {
    navigate("/surveys");
  };

  const [data, setData] = React.useState<
    { question: string; choices: string[]; type: string; answer: string[] }[]
  >([
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "New York"],
      type: "Quiz",
      answer: ["Paris"],
    },
  ]); // Temporary Database
  const slides: Slide[] = data.map((x) => ({
    question: x.question,
    choices: x.choices,
    type: x.type,
    answer: x.answer,
  }));

  //const [data, setData] = React.useState(questions); // Use for edit page
  const [seed, setSeed] = React.useState(1); // Reload State
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setDataType = (index: number, type: string) => {
    setData((data) => {
      data[index].type = type;
      return [...data]; // because you want updated state for anything watching for changes
    });
  };
  const getDataType = (index: number) => {
    return data[index].type;
  };
  const [slideIndex, setSlideIndex] = React.useState(0);

  const [type, setType] = React.useState("");

  const handleChange = (index: number, event: SelectChangeEvent) => {
    setDataType(index, event.target.value as string);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <CssBaseline />
      <Layout />
      <Container
        maxWidth={false}
        disableGutters
        sx={{ display: "inline-flex" }}
      >
        {/*Page Slider*/}

        <Box
          sx={{
            width: 1 / 5,
            backgroundColor: "#C4C4C4",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "auto",
          }}
        >
          <SliderComponent
            slides={slides}
            setSlideIndex={setSlideIndex}
            slideIndex={slideIndex}
            data={data}
            setData={setData}
          />
        </Box>

        {/*Making Quiz*/}
        <Box
          sx={{
            width: 3 / 5,
            textAlign: "-webkit-center",
          }}
        >
          {data.map(
            (question, index) =>
              slideIndex === index && (
                <Box
                  sx={{
                    width: "95%",
                    textAlign: "-webkit-center",
                  }}
                  key={index}
                >
                  <h1 className="text-center">Create Questions</h1>
                  <h2 className="text-center">Question {index + 1}</h2>
                  <div>
                    <QuizCard
                      question={question}
                      setQuestion={(incomingQ: any) => {
                        setData(data.map((currentQ, indexQ) => ((index === indexQ) ? incomingQ : currentQ)));
                      }}
                    />
                    {/* {getDataType(index) === "Quiz" && <Quiz_Template index={index} question = {question.question} answers = {question.choices} setData= {setData} data={data}/>}
                            {getDataType(index) === "Type Answer" && <Type_Question setData= {setData} data={data} index={index}/>}
                            {getDataType(index) === "Multi Answer Question" && <Multi_Ans_Quiz_Template answer index={index} question = {question.question} answers = {question.choices} setData= {setData} data={data}/>} */}
                  </div>
                </Box>
              )
          )}
        </Box>

        {/*Setup Type, Timer*/}

        <Box
          sx={{
            width: 1 / 5,
            backgroundColor: "#5770B2",
            flexDirection: "column",
            justifyContent: "end",
            textAlign: "-webkit-center",
          }}
        >
          {/*Question Type*/}

          <Box sx={{ m: 2 }}>
            <Grid
              sx={{
                backgroundColor: "#C4C4C4",
                width: 1 / 2,
                textAlign: "center",
              }}
            >
              <Typography variant="h5" sx={{ color: "#2AA789" }}>
                Question Type
              </Typography>
            </Grid>
          </Box>
          <Box sx={{ m: 2 }}>
            <FormControl
              fullWidth
              sx={{
                backgroundColor: "#C4C4C4",
                width: 1 / 2,
                textAlign: "center",
              }}
            >
              <InputLabel
                id="demo-simple-select-label"
                color="primary"
                sx={{ fontWeight: "bold", color: "#000000" }}
              >
                Quiz Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="question type"
                onChange={(event) => handleChange(slideIndex, event)}
              >
                <MenuItem value={"Quiz"} placeholder="Quiz">
                  Quiz
                </MenuItem>
                <MenuItem value={"Type Answer"} placeholder="Type Answer">
                  Type Answer
                </MenuItem>
                <MenuItem
                  value={"Multi Answer Question"}
                  placeholder="Multi Answer Question"
                >
                  Multi Answer Question
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ m: 2 }}>
            <FormControl
              fullWidth
              sx={{
                backgroundColor: "#C4C4C4",
                width: 1 / 2,
                textAlign: "center",
              }}
            >
              <InputLabel
                id="demo-simple-select-label"
                color="primary"
                sx={{ fontWeight: "bold", color: "#000000" }}
              >
                Quiz Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="question type"
                onChange={(event) => handleChange(slideIndex, event)}
              >
                <MenuItem value={"Quiz"} placeholder="Quiz">
                  Quiz
                </MenuItem>
                <MenuItem value={"Type Answer"} placeholder="Type Answer">
                  Type Answer
                </MenuItem>
                <MenuItem
                  value={"Multi Answer Question"}
                  placeholder="Multi Answer Question"
                >
                  Multi Answer Question
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ m: 2 }}>
            <Button
              color="warning"
              variant="contained"
              sx={{ color: "#52DB4B", backgroundColor: "#DB7A35" }}
              onClick={handleClickOpen}
            >
              Save
            </Button>
          </Box>
        </Box>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill in the name, category, time and the date end for the
              survey
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="category"
              label="Category"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="time"
              label="Time (minites) for the survey"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="expirired"
              label="Expirired Date"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default CreateSurvey;
