import React, { useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import QuizCard from "../../components/organisms/QuizCard";
import {
  Survey,
  createSurvey1,
  getSurveyByID,
  getSurveyId,
  getSurveys,
  saveSurvey,
  setSurveyById,
  updateSurveyByID,
} from "../../services/dataService/dataService";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
  PickerChangeHandlerContext,
  TimePicker,
  TimeValidationError,
} from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";

interface Slide {
  question: string;
  choices: string[];
  type: string;
  answer: string[];
}
//const slides = questions_test.map(x=>({no: x.no, question: x.question, choices:x.choices, type: x.type, answer:x.answer}))
//const slides = questions.map(x=>({no: x.no, type: x.question}))

const CreateSurvey: React.FC<any> = () => {
  //get ID from URL
  const params = useParams();

  //Router
  const navigate = useNavigate();
  const [tempSur, setTempSur] = React.useState<{
    surveyId: string;
    surveyName: string;
    owner: string;
    category: string;
    timer: string;
    startDate: string;
    endDate: string;
    status: string;
    enableStatus: boolean;
    questions: {
      no: number;
      question: string;
      choices: string[];
      type: string;
      answer: string[];
    }[];
  }>({
    surveyId: "",
    surveyName: "Geography of Countries",
    owner: "Random",
    category: "Survey",
    timer: "15:20",
    startDate: "2023/02/02",
    endDate: "2023/07/07",
    status: "composing",
    enableStatus: false,
    questions: [
      {
        no: 1,
        question: "What is the capital of France?",
        choices: ["Paris", "London", "New York"],
        type: "Quiz",
        answer: ["Paris", "London"],
      },
    ],
  });

  const [timervalue, setTimervalue] = React.useState<Dayjs | null>(
    dayjs("2022-04-17T15:30")
  );
  const [startDate, setStartDate] = React.useState<Dayjs | null>(
    dayjs("2023-04-17T15:30")
  );
  const [endDate, setEndDate] = React.useState<Dayjs | null>(
    dayjs("2023-06-19T15:30")
  );

  const [data, setData] = React.useState<
    {
      no: number;
      question: string;
      choices: string[];
      type: string;
      answer: string[];
    }[]
  >(tempSur.questions); // Temporary Database
  // const slides: Slide[] = data.map((x) => ({
  //   question: x.question,
  //   choices: x.choices,
  //   type: x.type,
  //   answer: x.answer,
  // }));
  const [slides, setSlides] = React.useState<Slide[]>(
    data.map((x) => ({
      question: x.question,
      choices: x.choices,
      type: x.type,
      answer: x.answer,
    }))
  );

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

  const [category, setCategory] = React.useState("");

  const handleChange = (index: number, event: SelectChangeEvent) => {
    setDataType(index, event.target.value as string);
    setType(event.target.value);
  };

  const handleChangeNameSurvey = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTempSur({ ...tempSur, surveyName: e.target.value });
  };

  const handleChangeCategorySurvey = (e: SelectChangeEvent<string>) => {
    setTempSur({ ...tempSur, category: e.target.value });

  };

  const handleChangeTimerSurvey = (e: Dayjs | null) => {
    if (e === null) {
      tempSur.timer = "00:00";
    } else {
      const hours = e.hour().toString().padStart(2, "0");
      const minutes = e.minute().toString().padStart(2, "0");
      const formattedTime = `${hours}:${minutes}`;
      tempSur.timer = formattedTime;
      setTempSur({ ...tempSur, timer: formattedTime });
    }

    setTempSur(tempSur);
  };
  const handleChangeStartDateSurvey = (e: Dayjs | null) => {
    if (e === null) {
      tempSur.startDate = "00:00";
    } else {
      const days = e.day().toString().padStart(2, "0");
      const months = e.month().toString().padStart(2, "0");
      const years = e.year().toString().padStart(2, "0");
      const hours = e.hour().toString().padStart(2, "0");
      const minutes = e.minute().toString().padStart(2, "0");
      const formattedTime = `${years}-${months}-${days}T${hours}:${minutes}`;
      tempSur.startDate = formattedTime;
      setTempSur({ ...tempSur, startDate: formattedTime });
    }

    setTempSur(tempSur);
  };
  const handleChangeEndDateSurvey = (e: Dayjs | null) => {
    if (e === null) {
      tempSur.endDate = "00:00";
    } else {
      const days = e.day().toString().padStart(2, "0");
      const months = e.month().toString().padStart(2, "0");
      const years = e.year().toString().padStart(2, "0");
      const hours = e.hour().toString().padStart(2, "0");
      const minutes = e.minute().toString().padStart(2, "0");
      const formattedTime = `${years}-${months}-${days}T${hours}:${minutes}`;
      tempSur.endDate = formattedTime;
    }
    setTempSur(tempSur);
  };
  const generateRandom = (len: any, absentArray: any) => {
    const randomArray: any[] = [];
    for (let i = 0; i < len; ) {
      const random = Math.floor(Math.random() * 100);
      if (!absentArray.includes(random) && !randomArray.includes(random)) {
        randomArray.push(random);
        i++;
      }
    }
    return randomArray;
  };

  const handleSave = () => {
    if (tempSur.surveyId === "") {
      tempSur.surveyId = generateRandom(1, getSurveyId()).toString();
      setTempSur(tempSur);
    }

    const listID = getSurveys().map((survey) => survey.surveyId);
    if (listID.includes(tempSur.surveyId)) {
      setSurveyById(tempSur.surveyId, tempSur);
    } else {
      tempSur.questions = data;
      createSurvey1(tempSur);
    }
    //saveSurvey(getSurvey());

    console.log(localStorage.getItem("myData"));
    navigate("/surveys");
  };

  useEffect(() => {
    if (params.surveyId !== undefined) {
      const newSur: Survey = getSurveyByID(params.surveyId);

      setTempSur({
        surveyId: newSur.surveyId,
        surveyName: newSur.surveyName,
        owner: newSur.owner,
        category: newSur.category,
        timer: newSur.timer,
        startDate: newSur.startDate,
        endDate: newSur.endDate,
        status: newSur.status,
        enableStatus: false,
        questions: newSur.questions,
      });

      setData(
        newSur.questions.map((question) => ({
          no: question.no,
          question: question.question,
          choices: question.choices,
          type: question.type,
          answer: question.answer,
        }))
      );
      setTimervalue(dayjs(`2022-04-17T${tempSur.timer}`));
      setStartDate(dayjs(tempSur.startDate));
      setEndDate(dayjs(tempSur.endDate));
      setSlides(
        data.map((x) => ({
          question: x.question,
          choices: x.choices,
          type: x.type,
          answer: x.answer,
        }))
      );
    }
  }, [params.surveyId]);

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
                        setData(
                          data.map((currentQ, indexQ) =>
                            index === indexQ ? incomingQ : currentQ
                          )
                        );
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

        {/*Setup Type, additional information for survey*/}

        <Box
          sx={{
            position: "fixed",
            right: 0,
            left: "auto",
            top: "auto",
            bottom: 0,
            backgroundColor: "#F5F5F5",
            padding: "20px",
            boxSizing: "border-box",
            resize: "horizontal",
            overflow: "auto",
          }}
        >
          {/* Question Type */}
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              width: "100%",
              marginBottom: "20px",
              padding: "20px",
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: "#2AA789", marginBottom: "10px" }}
            >
              Question Type
            </Typography>
            <FormControl fullWidth sx={{ backgroundColor: "#FFFFFF" }}>
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
                onChange={(event) => handleChange(slideIndex, event)}
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
            </FormControl>
          </Box>

          {/* Survey additional information */}
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              width: "100%",
              marginBottom: "20px",
              padding: "20px",
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: "#2AA789", marginBottom: "10px" }}
            >
              Survey Information
            </Typography>
            <FormControl fullWidth sx={{ backgroundColor: "#FFFFFF" }}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                fullWidth
                value={tempSur.surveyName}
                variant="standard"
                sx={{ marginBottom: "10px" }}
                onChange={(e) => handleChangeNameSurvey(e)}
              />

              {/* Setup Category */}
              <FormControl fullWidth sx={{ backgroundColor: "#FFFFFF" }}>
                <InputLabel
                  id="demo-simple-select-label"
                  color="primary"
                  sx={{ color: "#000000" }}
                >
                  {"Category"}
                </InputLabel>
                <Select
                  value={category}
                  label="question type"
                  onChange={(e) => handleChangeCategorySurvey(e)}
                  sx={{
                    backgroundColor: "#FFFFFF",
                    fontSize: "1rem",
                    paddingRight: "20px",
                  }}
                >
                  <MenuItem
                    value={"PE"}
                    sx={{
                      backgroundColor: "#FFFFFF",
                      fontSize: "1rem",
                    }}
                  >
                    PE
                  </MenuItem>
                  <MenuItem
                    value={"Physics"}
                    sx={{
                      backgroundColor: "#FFFFFF",
                      fontSize: "1rem",
                    }}
                  >
                    Physics
                  </MenuItem>
                  <MenuItem
                    value={"Programming"}
                    sx={{
                      backgroundColor: "#FFFFFF",
                      fontSize: "1rem",
                    }}
                  >
                    Programming
                  </MenuItem>
                </Select>
              </FormControl>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker", "TimePicker"]}>
                  <TimePicker
                    label="Timer"
                    ampm={false}
                    value={dayjs(`1000-01-01T${tempSur.timer}`)}
                    onChange={handleChangeTimerSurvey}
                  />
                </DemoContainer>
                <DemoContainer
                  components={["DateTimePicker", "DateTimePicker"]}
                >
                  <DateTimePicker
                    label="Start Date"
                    value={dayjs(tempSur.startDate)}
                    onChange={handleChangeStartDateSurvey}
                  />

                  <DateTimePicker
                    label="Expired Date"
                    value={dayjs(tempSur.endDate)}
                    onChange={handleChangeEndDateSurvey}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </FormControl>
          </Box>

          <Button
            color="warning"
            variant="contained"
            sx={{
              color: "#FFFFFF",
              backgroundColor: "#2AA789",
              marginBottom: "20px",
            }}
            onClick={handleClickOpen}
          >
            Save
          </Button>
        </Box>

        {/* Open pop-up window */}

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Save?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you absolutely certain you wish to save your survey?
            </DialogContentText>
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
