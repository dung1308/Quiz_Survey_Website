import React, { useEffect, useState } from "react";
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
  CreateQuestionBank,
  CreateQuestionBankByUserId,
  GetCategories,
  GetCurrentDate,
  GetQuestionBankById,
  QuestionBank,
  Survey,
  createSurvey1,
  getSurveyByID,
  getSurveyCodes,
  getSurveyId,
  getSurveys,
  saveSurvey,
  setQuestionBankById,
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
import Surveys from "../surveys";
import moment from "moment";

interface Slide {
  no: string;
  question: string;
  choices: string[];
  type: string;
  answer: string[];
}

interface QuestionDTO {
  id: number;
  questionName: string;
  choices: string[];
  type: string;
  answers: string[];
  score: number;
  questionBankId: number;
}

//const slides = questions_test.map(x=>({no: x.no, question: x.question, choices:x.choices, type: x.type, answer:x.answer}))
//const slides = questions.map(x=>({no: x.no, type: x.question}))

const CreateSurvey: React.FC<any> = () => {
  //get ID from URL
  const params = useParams();

  // useState Question Bank from API
  const [questionBank, setQuestionBank] = useState<QuestionBank>(
    new QuestionBank({})
  );

  // useState for Ask Or Answer, onAswers
  const [askOrAnswer, setAskOrAnswer] = useState("ask");
  const [onAnswerQuiz, setOnAnswerQuiz] = React.useState([""]);
  const [onAnswerMulti, setOnAnswerMulti] = React.useState([""]);
  const [onAnswerTyping, setOnAnswerTyping] = React.useState([""]);

  // Time
  const [currentDate, setCurrentDate] = React.useState("");
  const [date, setDate] = React.useState("");
  const [isStartDateValid, setIsStartDateValid] = React.useState(true);
  const [isStartDateAfterValid, setIsStartDateAfterValid] =
    React.useState(true);
  const [isEndDateValid, setIsEndDateValid] = React.useState(true);
  const [isEndDateAfterValid, setIsEndDateAfterValid] = React.useState(true);
  const isValidDateFormat = (dateString: string) => {
    const regex =
      /^(\d{4})-(0[1-9]|1[0-2])-([0-2][1-9]|3[0-1]) ([01][0-9]|2[0-3]):([0-5][0-9])$/;
    return regex.test(dateString);
  };

  function formatDate(dateString: string) {
    const formatString = "MM-DD-YYYY HH:mm";
    return dayjs(dateString, "YYYY-MM-DDTHH:mm").format(formatString);
  }

  const handleStartDateChange = (e: string) => {
    // console.log(e);
    const formattedString = e.replace(/-/g, "/").replace(" ", "T");
    const finalString =
      dayjs(formattedString, "MM/DD/YYYYTHH:mm").format("YYYY-MM-DDTHH:mm") ||
      dayjs(
        dayjs(tempSur.startDate).format("YYYY-MM-DDTHH:mm"),
        "MM/DD/YYYYTHH:mm"
      ).format("YYYY-MM-DDTHH:mm");
    setIsStartDateValid(dayjs(finalString).isValid());
    // console.log(isStartDateValid);
    if (!isStartDateValid) {
      return;
    } else {
      const isAfterCurrentDate =
        dayjs(e).isAfter(dayjs(questionBank.dateTimeNow)) ||
        dayjs(dayjs(tempSur.startDate).format("YYYY-MM-DDTHH:mm")).isAfter(
          dayjs(questionBank.dateTimeNow)
        );
      const isSameAsCurrentDate = dayjs(e).isSame(
        dayjs(questionBank.dateTimeNow)
      );
      setIsStartDateAfterValid(isAfterCurrentDate || isSameAsCurrentDate);
      setTempSur({ ...tempSur, startDate: finalString });
      // console.log("Start Date:", tempSur.startDate);
    }
  };

  const handleEndDateChange = (e: string) => {
    // console.log(e);
    const formattedString = e.replace(/-/g, "/").replace(" ", "T");
    const finalString = dayjs(formattedString, "MM/DD/YYYYTHH:mm").format(
      "YYYY-MM-DDTHH:mm"
    );
    setIsEndDateValid(dayjs(finalString).isValid());
    // console.log(setIsEndDateValid);
    if (!setIsEndDateValid) {
      return;
    } else {
      const isAfterCurrentDate = dayjs(e).isAfter(
        dayjs(questionBank.dateTimeNow)
      );
      setIsEndDateAfterValid(isAfterCurrentDate);
      setTempSur({ ...tempSur, endDate: finalString });
      // console.log("End Date:", tempSur.endDate);
    }
  };

  //Router
  const navigate = useNavigate();
  const [surveyCodes, setSurveyCodes] = React.useState<string[]>([]);
  const [tempSur, setTempSur] = React.useState<{
    surveyId: string;
    surveyName: string;
    owner: string;
    categoryId: number;
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
    categoryId: 1,
    timer: "01:20",
    startDate: dayjs(questionBank.dateTimeNow).format("MM-DD-YYYY HH:mm"),
    endDate: dayjs(questionBank.dateTimeNow).add(7, 'day').format("MM-DD-YYYY HH:mm"),
    status: "composing",
    enableStatus: false,
    questions: [
      {
        no: 0,
        question: "What is the capital of France?",
        choices: ["Paris", "London", "New York"],
        type: "Quiz",
        answer: ["Paris"],
      },
    ],
  });

  const [timervalue, setTimervalue] = React.useState<Dayjs | null>(
    dayjs("2022-04-17T15:30")
  );
  const [startDate, setStartDate] = React.useState<Dayjs | null>(
    dayjs(questionBank.dateTimeNow)
  );
  // const [startDate, setStartDate] = React.useState<string | null>(
  //   "2023-06-19 15:30"
  // );
  const [endDate, setEndDate] = React.useState<Dayjs | null>(
    dayjs(questionBank.dateTimeNow).add(7, 'day')
  );
  // const [endDate, setEndDate] = React.useState<string | null>(
  //   "2023-06-19 15:30"
  // );

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
      no: x.no.toString(),
      question: x.question,
      choices: x.choices,
      type: x.type,
      answer: x.answer,
    }))
  );

  // Set Error, Save
  const [saveState, setSaveState] = useState(true);
  const [errorSave, setErrorSave] = useState(false);
  const [errorStates, setErrorStates] = useState(
    Array(data.length).fill(false)
  );
  const [errorDialog, setErrorDialog] = useState(false);
  const [isQuestionNameEmpty, setIsQuestionNameEmpty] = useState(
    tempSur.surveyName === ""
  );

  //const [data, setData] = React.useState(questions); // Use for edit page
  const [seed, setSeed] = React.useState(1); // Reload State
  const [open, setOpen] = React.useState(false);
  const [openSurveyCode, setOpenSurveyCode] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loadingAll, setLoadingAll] = React.useState(false);

  const handleClickOpen = () => {
    if (errorSave === false) setOpen(true);
    else setErrorDialog(true);
  };
  const handleCloseSurveyCode = () => {
    setOpenSurveyCode(false);
  };

  const handleOpenSurveyCode = () => {
    setOpenSurveyCode(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseErrorDialog = () => {
    setErrorDialog(false);
  };

  const handleChildError = (index: any, isError: any) => {
    setErrorStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = isError;
      return newStates;
    });
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

  const [categories, setCategories] = React.useState<
    { id: number; categoryName: string }[]
  >([{ id: 1, categoryName: "Quiz" }]);

  const [categoryIdChosen, setCategoryIdChosen] = React.useState<number>(1);

  const handleChange = (index: number, event: SelectChangeEvent) => {
    setDataType(index, event.target.value as string);
    setType(event.target.value);
  };

  const handleChangeNameSurvey = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTempSur({ ...tempSur, surveyName: e.target.value });
    setIsQuestionNameEmpty(e.target.value === "");
    // console.log(isQuestionNameEmpty);
  };

  // const handleChangeCategorySurvey = (e: SelectChangeEvent<string>) => {
  //   setTempSur({ ...tempSur, categoryId: e.target.value });

  // };

  const handleChangeCategorySurvey = (event: SelectChangeEvent<number>) => {
    setCategoryIdChosen(+event.target.value);
    setTempSur({ ...tempSur, categoryId: +event.target.value });
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
      setTempSur(tempSur);
    } else {
      // console.log(e.format("MM-DD-YYYYTHH:mm"))
      // const days = e.day().toString().padStart(2, "0");
      // console.log(days)
      // const months = e.month().toString().padStart(2, "0");
      // const years = e.year().toString().padStart(2, "0");
      // const hours = e.hour().toString().padStart(2, "0");
      // const minutes = e.minute().toString().padStart(2, "0");
      // const formattedTime = `${years}-${months}-${days}T${hours}:${minutes}`;
      const formattedTime = dayjs(e).format("MM-DD-YYYYTHH:mm");
      tempSur.startDate = formattedTime;
      console.log(tempSur.startDate);
      setTempSur({ ...tempSur, startDate: formattedTime });
      console.log(tempSur.startDate);

      const isAfterCurrentDate = e.isAfter(
        dayjs(currentDate, "MM/DD/YYYY HH:mm")
      );
      // console.log(e)
      // console.log(dayjs(questionBank.dateTimeNow))

      const isSameAsCurrentDate = dayjs(e).isSame(dayjs(currentDate, "MM/DD/YYYY HH:mm"));
      console.log(questionBank.dateTimeNow);

      setIsStartDateAfterValid(isSameAsCurrentDate || isAfterCurrentDate);
      console.log(isAfterCurrentDate);
      const isAfterEndDate = dayjs(e).isAfter(
        dayjs(tempSur.endDate, "MM/DD/YYYY HH:mm")
      );
      setIsEndDateAfterValid(!isAfterEndDate);
    }
  };

  const handleChangeEndDateSurvey = (e: Dayjs | null) => {
    if (e === null) {
      tempSur.endDate = "00:00";
      setTempSur(tempSur);
    } else {
      // console.log(e.format("MM-DD-YYYYTHH:mm"))
      // const days = e.day().toString().padStart(2, "0");
      // console.log(days)
      // const months = e.month().toString().padStart(2, "0");
      // const years = e.year().toString().padStart(2, "0");
      // const hours = e.hour().toString().padStart(2, "0");
      // const minutes = e.minute().toString().padStart(2, "0");
      // const formattedTime = `${years}-${months}-${days}T${hours}:${minutes}`;
      const formattedTime = e.format("MM-DD-YYYYTHH:mm");
      tempSur.endDate = formattedTime;
      setTempSur({ ...tempSur, endDate: formattedTime });

      const isAfterCurrentDate = e.isAfter(dayjs(currentDate, "MM/DD/YYYY HH:mm"));

      const isSameAsCurrentDate = e.isSame(dayjs(currentDate, "MM/DD/YYYY HH:mm"));
      const isAfterStartDate = e.isAfter(dayjs(tempSur.startDate, "MM-DD-YYYY HH:mm"));
      setIsEndDateAfterValid( 
        (isAfterCurrentDate || isSameAsCurrentDate)
        &&
        isAfterStartDate
      );
    }
  };
  // const handleChangeEndDateSurvey = (e: Dayjs | null) => {
  //   if (e === null) {
  //     tempSur.endDate = "00:00";
  //   } else {
  //     // const days = e.day().toString().padStart(2, "0");
  //     // const months = e.month().toString().padStart(2, "0");
  //     // const years = e.year().toString().padStart(2, "0");
  //     // const hours = e.hour().toString().padStart(2, "0");
  //     // const minutes = e.minute().toString().padStart(2, "0");
  //     // const formattedTime = `${years}-${months}-${days}T${hours}:${minutes}`;
  //     const isAfterCurrentDate = dayjs(
  //       e.format("MM-DD-YYYYTHH:mm"),
  //       "MM-DD-YYYYTHH:mm"
  //     ).isAfter(dayjs(tempSur.startDate, "MM-DD-YYYYTHH:mm"));
  //     // const isAfterone = moment(e.format("MM-DD-YYYYTHH:mm"), 'MM-DD-YYYYTHH:mm').isAfter(moment(tempSur.startDate, 'MM-DD-YYYYTHH:mm'))
  //     setIsEndDateAfterValid(isAfterCurrentDate);
  //     const formattedTime = e.format("MM-DD-YYYYTHH:mm");
  //     tempSur.endDate = formattedTime;
  //   }
  //   setTempSur(tempSur);
  // };
  // const generateRandom = (len: any, absentArray: any) => {
  //   const randomArray: any[] = [];
  //   for (let i = 0; i < len; ) {
  //     const random = Math.floor(Math.random() * 100);
  //     if (!absentArray.includes(random) && !randomArray.includes(random)) {
  //       randomArray.push(random);
  //       i++;
  //     }
  //   }
  //   return randomArray;
  // };
  function generateRandomString(
    excludedStrings: string[],
    length: number
  ): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      let char;
      do {
        char = characters.charAt(Math.floor(Math.random() * characters.length));
      } while (excludedStrings.includes(result + char));
      result += char;
    }
    if (excludedStrings.includes(result))
      return generateRandomString(excludedStrings, length + 1);

    return result;
  }
  const mappedQuestionBanks: QuestionDTO[] = data.map((question, index) => ({
    id: 0,
    questionName: question.question,
    choices: question.type === "Type Answer" ? [""] : question.choices,
    type: question.type,
    answers: question.type === "Type Answer" ? [""] : question.answer,
    score: 10,
    questionBankId: 0,
  }));

  const fetchCreate = async () => {
    //console.log(mappedQuestionBanks);

    const questionBankrs: QuestionBank = {
      id: 0,
      surveyCode: generateRandomString(surveyCodes, 10).toString(),
      surveyName: tempSur.surveyName,
      owner: tempSur.owner,
      timer: tempSur.timer,
      startDate: dayjs(tempSur.startDate, "MM-DD-YYYY HH:mm").format("MM-DD-YYYYTHH:mm"),
      endDate: dayjs(tempSur.endDate, "MM-DD-YYYY HH:mm").format("MM-DD-YYYYTHH:mm"),
      status: tempSur.status,
      enableStatus: tempSur.enableStatus,
      categoryListId: tempSur.categoryId, // categoryListId: tempSur.categoryId, There is context error in here
      categoryName: "string",
      dateTimeNow: "string",
      questionDTOs: mappedQuestionBanks,
    };

    console.log(questionBankrs);
    if (params.userId !== undefined) {
      await CreateQuestionBankByUserId(Number(params.userId), questionBankrs).then(
        (data) => {
          setSaveState(false);
          setQuestionBank(questionBankrs)
          setSaveState(true);
          navigate("/surveys")
        }
      );
    }
  };

  const mappedQuestionBanksExisted: QuestionDTO[] = data.map(
    (question, index) => ({
      id: question.no,
      questionName: question.question,
      choices: question.choices,
      type: question.type,
      answers: question.answer,
      score: 10,
      questionBankId: 0,
    })
  );

  const fetchUpdate = async () => {
    //console.log(mappedQuestionBanks);

    const questionBankrs: QuestionBank = {
      id: 0,
      surveyCode: questionBank.surveyCode,
      surveyName: tempSur.surveyName,
      owner: tempSur.owner,
      timer: tempSur.timer,
      startDate: tempSur.startDate,
      endDate: tempSur.endDate,
      status: tempSur.status,
      enableStatus: tempSur.enableStatus,
      categoryListId: tempSur.categoryId, // categoryListId: tempSur.categoryId, There is context error in here
      categoryName: "string",
      dateTimeNow: "string",
      questionDTOs: mappedQuestionBanksExisted,
    };
    // console.log(questionBankrs);

    //Update(Number(params.userId), Number(tempSur.surveyId),questionBankrs);
    // console.log("This is edit");
    await setQuestionBankById(Number(tempSur.surveyId), questionBankrs).then(
      (data) => {
        setSaveState(false);
        setQuestionBank(questionBankrs)
        setSaveState(true);
        navigate("/surveys")
      }
    );
  };

  const handleSave = () => {
    setSaveState(true);

    if (tempSur.surveyId === "") {
      fetchCreate();
    } else {
      fetchUpdate();
    }

    // setSaveState(false);
    // if (tempSur.surveyId === "") {
    //   fetchCreate();
    // }
    // const listID = getSurveys().map((survey) => survey.surveyId);
    // if (listID.includes(tempSur.surveyId)) {
    //   setSurveyById(tempSur.surveyId, tempSur);
    // } else {
    //   tempSur.questions = data;
    //   createSurvey1(tempSur);
    // }
    // //saveSurvey(getSurvey());

    // console.log(localStorage.getItem("myData"));
    // if (saveState === true) {
    //   setTimeout(() => {
    //     navigate("/surveys")
    //   }, 1000);
    // }
  };

  const fetchData = async () => {
    if (params.surveyId !== undefined) {
      await GetQuestionBankById(+params.surveyId).then((tempData) => {
        setLoading(true);
        setQuestionBank(tempData);

        setData(
          tempData.questionDTOs.map((question: any) => ({
            no: question.id,
            question: question.questionName,
            choices: question.choices,
            type: question.type,
            answer: question.answers,
          }))
        );
        setTempSur({
          surveyId: tempData.id.toString(),
          surveyName: tempData.surveyName,
          owner: tempData.owner,
          categoryId: tempData.categoryListId,
          timer: tempData.timer,
          startDate: tempData.startDate,
          endDate: tempData.endDate,
          status: tempData.status,
          enableStatus: tempData.enableStatus,
          questions: data,
        });
        setCategoryIdChosen(tempData.categoryListId);
        setTimervalue(dayjs(`2022-04-17T${tempSur.timer}`));
        setStartDate(dayjs(tempData.startDate, "MM-DD-YYYY HH:mm"));
        console.log(tempSur.startDate);
        console.log(startDate?.format("MM-DD-YYYY HH:mm"));
        // console.log(startDate?.format("MM/DD/YYYY HH:mm"))
        setEndDate(dayjs(tempData.endDate, "MM-DD-YYYY HH:mm"));
        setCurrentDate(tempData.dateTimeNow);
        // setStartDate(formatDate(tempSur.startDate));
        // setEndDate(formatDate(tempSur.endDate));
        setSlides(
          data.map((x) => ({
            no: x.no.toString(),
            question: x.question,
            choices: x.choices,
            type: x.type,
            answer: x.answer,
          }))
        );
      });

      // console.log(tempSur);
    }
  };
  useEffect(() => {
    getSurveyCodes()
      .then((surveyCoders) => {
        //console.log(surveyCoders);
        setSurveyCodes(surveyCoders);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchData().then(() => {
      setLoading(false);
    });
  }, [params.surveyId, setStartDate, setEndDate]);

  useEffect(() => {
    GetCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  useEffect(() => {
    GetCurrentDate().then((data) => {
      setCurrentDate(data);
    });
  }, []);

  useEffect(() => {
    setErrorSave(errorStates.some((state) => state));
  }, [errorStates]);
  // useEffect(() => {
  //   setIsQuestionNameEmpty(tempSur.surveyName === "");
  // }, [tempSur.surveyName]);
  useEffect(() => {
    setErrorSave(
      isQuestionNameEmpty ||
        !isStartDateValid ||
        !isStartDateAfterValid ||
        !isEndDateValid ||
        !isEndDateAfterValid ||
        errorStates.some((state) => state)
    );
  }, [
    isQuestionNameEmpty,
    isStartDateValid,
    isStartDateAfterValid,
    isEndDateValid,
    isEndDateAfterValid,
    errorStates,
  ]);
  return (
    <Box sx={{ width: "100%" }}>
      <CssBaseline />
      <Layout />
      {loadingAll ? (
        <p>Loading...</p>
      ) : (
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
          {loading ? (
            <p>Loading...</p>
          ) : (
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
                          setErrorSave={(isError: any) =>
                            handleChildError(index, isError)
                          }
                          setQuestion={(incomingQ: any) => {
                            setData(
                              data.map((currentQ, indexQ) =>
                                index === indexQ ? incomingQ : currentQ
                              )
                            );
                          }}
                          askOrAnswer={askOrAnswer}
                          setOnAnswerQuiz={setOnAnswerQuiz}
                          setOnAnswerMulti={setOnAnswerMulti}
                          setOnAnswerTyping={setOnAnswerTyping}
                        />
                        {/* {getDataType(index) === "Quiz" && <Quiz_Template index={index} question = {question.question} answers = {question.choices} setData= {setData} data={data}/>}
                            {getDataType(index) === "Type Answer" && <Type_Question setData= {setData} data={data} index={index}/>}
                            {getDataType(index) === "Multi Answer Question" && <Multi_Ans_Quiz_Template answer index={index} question = {question.question} answers = {question.choices} setData= {setData} data={data}/>} */}
                      </div>
                    </Box>
                  )
              )}
            </Box>
          )}

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
                  label={
                    isQuestionNameEmpty ? "Please Enter Survey Name." : "Name"
                  }
                  fullWidth
                  value={tempSur.surveyName}
                  variant="standard"
                  sx={{ marginBottom: "10px" }}
                  InputLabelProps={{
                    shrink: tempSur.surveyName !== "",
                    error: isQuestionNameEmpty,
                  }}
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
                    value={categoryIdChosen}
                    label="question Category"
                    onChange={(e) => handleChangeCategorySurvey(e)}
                    sx={{
                      backgroundColor: "#FFFFFF",
                      fontSize: "1rem",
                      paddingRight: "20px",
                    }}
                  >
                    {categories.map((category) => (
                      <MenuItem
                        key={category.id}
                        value={category.id}
                        sx={{
                          backgroundColor: "#FFFFFF",
                          fontSize: "1rem",
                        }}
                      >
                        {category.categoryName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["TimePicker", "TimePicker"]}>
                    <TimePicker
                      label="Timer (Hours:Minutes)"
                      ampm={false}
                      value={dayjs(`1000-01-01T${tempSur.timer}`)}
                      minTime={dayjs("1000-01-01T00:05")}
                      maxTime={dayjs("1000-01-01T02:30")}
                      onChange={handleChangeTimerSurvey}
                    />
                  </DemoContainer>
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <DemoContainer
                      components={["DateTimePicker", "DateTimePicker"]}
                    >
                      {(!isStartDateValid && (
                        <Typography variant="caption" color="error">
                          Error. Check Format.
                        </Typography>
                      )) ||
                        (!isStartDateAfterValid && (
                          <Typography variant="caption" color="error">
                            Start Date Error: Before Current Time
                          </Typography>
                        ))}
                      <DateTimePicker
                        label="Start Date"
                        value={dayjs(startDate)}
                        onChange={handleChangeStartDateSurvey}
                      />
                      {(!isEndDateValid && (
                        <Typography variant="caption" color="error">
                          Error. Check Format.
                        </Typography>
                      )) ||
                        (!isEndDateAfterValid && (
                          <Typography variant="caption" color="error">
                            Expired Date Error: Before Start Date
                          </Typography>
                        ))}

                      <DateTimePicker
                        label="Expired Date"
                        value={dayjs(endDate)}
                        onChange={handleChangeEndDateSurvey}
                      />
                    </DemoContainer>
                  )}
                </LocalizationProvider>

                {/* Set Start Date */}
                {/* <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label={"Start Date (Month-Day-Year Hour:Minute)"}
                  fullWidth
                  defaultValue={formatDate(
                    dayjs(tempSur.startDate).format("YYYY-MM-DDTHH:mm")
                  )}
                  variant="standard"
                  sx={{ marginBottom: "10px" }}
                  error={!isStartDateValid || !isStartDateAfterValid}
                  helperText={
                    (!isStartDateValid && "Error. Check Format.") ||
                    (!isStartDateAfterValid && "Before Current Time Error")
                  }
                  // InputLabelProps={{
                  //   shrink: tempSur.surveyName !== "",
                  //   error: isQuestionNameEmpty,
                  // }}
                  onChange={(e) => handleStartDateChange(e.target.value)}
                /> */}
                {/* Set End Date */}
                {/* <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label={"End Date (Month-Day-Year Hour:Minute)"}
                  fullWidth
                  defaultValue={formatDate(
                    dayjs(tempSur.endDate).format("YYYY-MM-DDTHH:mm")
                  )}
                  variant="standard"
                  sx={{ marginBottom: "10px" }}
                  error={!isEndDateValid || !isEndDateAfterValid}
                  helperText={
                    (!isEndDateValid && "Error. Check Format.") ||
                    (!isEndDateAfterValid && "Before Start Date Error")
                  }
                  onChange={(e) => handleEndDateChange(e.target.value)}
                /> */}
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
              <Button onClick={handleOpenSurveyCode}>Save</Button>
            </DialogActions>
          </Dialog>

          <Dialog open={errorDialog} onClose={handleCloseErrorDialog}>
            <DialogTitle>Error</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you absolutely certain that your survey is correct? You
                should check again!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseErrorDialog}>OK</Button>
            </DialogActions>
          </Dialog>
          <Dialog open={openSurveyCode} onClose={handleCloseSurveyCode}>
            <DialogTitle>Survey Code</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Your Survey Code is {questionBank.surveyCode}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSave}>Save</Button>
            </DialogActions>
          </Dialog>
        </Container>
      )}
    </Box>
  );
};

export default CreateSurvey;
