import React, { useEffect } from "react";
import Layout from "../../components/templates/layout";
import {
  Button,
  Box,
  Container,
  CssBaseline,
  Grid,
  Typography,
  SelectChangeEvent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Timer_Answer from "../../components/atoms/timer";
import Quiz_Answer from "../../components/organisms/answer_questions/quiz";
import SliderComponent_Answer from "../../components/organisms/answer_questions/page_slider";
import Type_Answer from "../../components/organisms/answer_questions/type_question";
import Multi_Ans_Quiz_Answer from "../../components/organisms/answer_questions/multiAnsQuiz";
import { useNavigate, useParams } from "react-router-dom";
import {
  CreateAnswer,
  GetLatestInteractByUserAndQuestionBank,
  GetQuestionBankById,
  GetQuestionsByQuestionBankId,
  Interaction,
  Question,
  QuestionBank,
  Survey,
  getSurveyByID,
} from "../../services/dataService/dataService";
import QuizCard_Answer from "../../components/organisms/answer_questions/QuizCard";

const questions_sample = [
  {
    no: 1,
    question: "What is the largest planet in our solar system?",
    choices: ["Mars", "Jupiter", "Venus", "Earth"],
    type: "Multi Answer Question",
    answer: ["Jupiter", "Mars"],
  },
  {
    no: 2,
    question: "What is the largest planet in our solar system?",
    choices: ["Mars", "Jupiter", "Venus", "Earth"],
    type: "Multi Answer Question",
    answer: ["Jupiter", "Mars"],
  },
  {
    no: 3,
    question: "What is the largest planet in our solar system?",
    choices: ["Mars", "Jupiter", "Venus", "Earth"],
    type: "Multi Answer Question",
    answer: ["Jupiter", "Mars"],
  },
  {
    no: 4,
    question: "What is the largest planet in our solar system?",
    choices: [""],
    type: "Type Answer",
    answer: [""],
  },
  {
    no: 5,
    question: "What is the largest planet in our solar system?",
    choices: ["Mars", "Jupiter", "Venus", "Earth"],
    type: "Multi Answer Question",
    answer: ["Jupiter", "Mars"],
  },
  {
    no: 6,
    question: "Hello?",
    choices: ["Mars", "Jupiter", "Venus", "Earth"],
    type: "Multi Answer Question",
    answer: ["Jupiter", "Mars"],
  },
];

interface ResultShowDTO {
  id: number;
  onAnswers: string[];
  resultScore: number;
  questionId: number;
  questionBankInteractId: number;
}

const AnswerPage: React.FC<any> = () => {
  const params = useParams();
  const [questionBank, setQuestionBank] = React.useState<QuestionBank>();
  const [loading, setLoading] = React.useState(true);
  const [loadingSubmit, setLoadingSubmit] = React.useState(true);
  const [questionAPI, setQuestionAPI] = React.useState();
  const [openResult, setOpenResult] = React.useState(false);
  const [finalResult, setFinalResult] = React.useState(0.0);
  const navigate = useNavigate();

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

  const [data, setData] = React.useState<Question[]>(questions_sample); // Temporary Database
  const [overTime, setOverTime] = React.useState(false);

  const calculateTime = (time: any) => {
    let matches = time.match(/\d+/g);
    const totalTime = +matches[0] * 60 * 60 + +matches[1] * 60;
    return totalTime;
  };
  const mappedQuestions = questionBank?.questionDTOs?.map(
    (questionDTO, index) => ({
      no: questionDTO.id,
      question: questionDTO.questionName,
      choices: questionDTO.choices,
      type: questionDTO.type,
      answer: questionDTO.answers,
    })
  );
  // const fetchData = async () => {
  //   if (questionBank !== undefined) {
  //     setTempSur({
  //       surveyId: questionBank.id.toString(),
  //       surveyName: questionBank.surveyName,
  //       owner: questionBank.owner,
  //       categoryId: questionBank.categoryListId,
  //       timer: questionBank.timer,
  //       startDate: questionBank.startDate,
  //       endDate: questionBank.endDate,
  //       status: questionBank.status,
  //       enableStatus: questionBank.enableStatus,
  //       questions: mappedQuestions || [],
  //     });
  //   }
  //   setData(tempSur.questions);
  // };

  const fetchData = async () => {
    if (params.surveyId !== undefined) {
      const newSur: QuestionBank = await GetQuestionBankById(+params.surveyId);
      setQuestionBank(newSur);

      setData(
        newSur.questionDTOs.map((question) => ({
          no: question.id,
          question: question.questionName,
          choices: question.choices,
          type: question.type,
          answer: [],
        }))
      );
      setTempSur({
        surveyId: newSur.id.toString(),
        surveyName: newSur.surveyName,
        owner: newSur.owner,
        categoryId: newSur.categoryListId,
        timer: newSur.timer,
        startDate: newSur.startDate,
        endDate: newSur.endDate,
        status: newSur.status,
        enableStatus: newSur.enableStatus,
        questions: data,
      });

      console.log(tempSur);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData().then(() => {
      setLoading(false);
    });
  }, [params.surveyId]);
  // useEffect(() => {
  //   setLoading(true);
  //   if (params.surveyId !== undefined) {
  //     GetQuestionsByQuestionBankId(+params.surveyId).then((data) => {
  //       setQuestionBank(data);
  //       setLoading(false);
  //       console.log(data);
  //     });
  //   }
  // }, []);

  const slides = data
    ? data.map((x) => ({
        question: x.question,
        choices: x.choices,
        type: x.type,
        answer: x.answer,
      }))
    : [];

  const [seed, setSeed] = React.useState(1); // Reload State
  const scrollRefs = React.useRef<Array<HTMLDivElement | null>>([]);

  const setDataType = (index: number, type: string) => {
    data[index].type = type;
  };
  const getDataType = (index: number) => {
    return data[index].type;
  };
  const [slideIndex, setSlideIndex] = React.useState(0);
  const handleCardClick = (no: number) => {
    setSlideIndex(no);
  };
  const [type, setType] = React.useState("");
  const handleChange = (index: number, event: SelectChangeEvent) => {
    setDataType(index, event.target.value as string);
    setSeed(Math.random());
  };
  const [openSubmit, setOpenSubmit] = React.useState(false);
  const handleOpenSubmit = () => {
    setOpenSubmit(true);
  };
  const handleCloseSubmit = () => {
    setOpenSubmit(false);
  };

  const handleCloseOverTime = () => {
    setOverTime(false);
  };

  const handleOpenResult = () => {
    setOpenResult(true);
  };

  const handleCloseResult = () => {
    setOpenResult(false);
  };

  const mappedResultShowExisted: ResultShowDTO[] = data.map(
    (question, index) => ({
      id: 0,
      onAnswers: question.answer,
      resultScore: 0,
      questionId: question.no,
      questionBankInteractId: 0,
    })
  );

  const fetchCreateAnswer = () => {
    //console.log(mappedQuestionBanks);

    const questionBankInteract: Interaction = {
      id: 0,
      resultScores: 0,
      userId: +(params.userId ?? 0),
      questionBankId: +(params.surveyId ?? 0),
      resultShowDTOs: mappedResultShowExisted,
    };

    CreateAnswer(questionBankInteract).then((index) => {
      GetLatestInteractByUserAndQuestionBank(
        +(params.userId ?? 0),
        +(params.surveyId ?? 0)
      ).then((data) => {
        setFinalResult(data.resultScores);
        handleOpenResult();
      });
    });
    console.log(questionBankInteract);

    // Update(Number(params.userId), Number(tempSur.surveyId),questionBankrs);
    // console.log("This is edit");
    // setQuestionBankById(Number(tempSur.surveyId), questionBankrs);
  };

  const handleSubmit = () => {
    fetchCreateAnswer();
    handleCloseOverTime();
    handleCloseSubmit();
    // setTimeout(() => {
    //   GetLatestInteractByUserAndQuestionBank(
    //     +(params.userId ?? 0),
    //     +(params.surveyId ?? 0)
    //   ).then((data) => {
    //     setFinalResult(data.resultScores);
    //     handleOpenResult();
    //   });
    // }, 1000);

    // setTimeout(() => {
    //   handleOpenResult();
    // }, 1000);

    //navigate("/surveys");
  };
  const handleResultOk = () => {
    setOpenResult(false);
    navigate("/surveys");
  };

  return (
    <>
      <CssBaseline />
      <Layout />
      {loading ? (
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
              width: 1 / 4,
              height: "100vh",
              backgroundColor: "#A0B3A0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              overflow: "auto",
            }}
          >
            <SliderComponent_Answer
              slides={slides}
              setSlideIndex={setSlideIndex}
              slideIndex={slideIndex}
              data={data}
              setData={setData}
              scrollRefs={scrollRefs}
            />
          </Box>
          <Box
            key={seed}
            sx={{
              width: 2 / 4,
              height: "100vh",
              textAlign: "-webkit-center",
              overflow: "auto",
            }}
          >
            {/*Making Quiz*/}
            {data.map((question, index) => (
              <Box
                key={seed}
                sx={{
                  width: 2 / 4,
                  height: "100vh",
                  textAlign: "-webkit-center",
                }}
              >
                <div ref={(el) => (scrollRefs.current[index] = el)}>
                  <h1 className="text-center">Question {index + 1}</h1>
                  <QuizCard_Answer
                    question={question}
                    setQuestion={(incomingQ: any) => {
                      setData(
                        data.map((currentQ, indexQ) =>
                          index === indexQ ? incomingQ : currentQ
                        )
                      );
                    }}
                  />
                  {/* {getDataType(index) === "Quiz" && (
                  <Quiz_Answer
                    index={index + 1}
                    question={question.question}
                    answers={question.choices}
                    setQuestion={(incomingQ: any) => {
                      setData(
                        data.map((currentQ, indexQ) =>
                          index === indexQ ? incomingQ : currentQ
                        )
                      );
                    }}
                  />
                )}
                {getDataType(index) === "Type Answer" && (
                  <Type_Answer index={index + 1} question={question.question} />
                )}
                {getDataType(index) === "Multi Answer Question" && (
                  <Multi_Ans_Quiz_Answer
                    index={index + 1}
                    question={question.question}
                    answers={question.choices}
                  />
                )} */}
                </div>
              </Box>
            ))}
          </Box>

          {/*Setup Type, Timer*/}

          <Box
            sx={{
              width: 1 / 4,
              height: "100vh",
              backgroundColor: "#5770B2",
              flexDirection: "column",
              justifyContent: "end",
              textAlign: "-webkit-center",
            }}
          >
            {/*Timer*/}

            <Grid
              sx={{
                backgroundColor: "#C4C4C4",
                width: 1 / 2,
                textAlign: "center",
                m: 2,
              }}
            >
              <Typography variant="h5" sx={{ color: "#2AA789" }}>
                Timer
              </Typography>
            </Grid>

            <Grid
              sx={{
                backgroundColor: "#C4C4C4",
                width: 1 / 2,
                textAlign: "center",
              }}
            >
              <Timer_Answer
                time={calculateTime(tempSur.timer)}
                overTime={overTime}
                setOverTime={setOverTime}
              />
            </Grid>

            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Button
                className="submit-button"
                sx={{
                  backgroundColor: "#8d6e63",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px 20px",
                  cursor: "pointer",
                }}
                onClick={handleOpenSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Box>
          <Dialog open={openSubmit} onClose={handleCloseSubmit}>
            <DialogTitle>Save?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you absolutely certain you wish to submit your answers?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseSubmit}>Cancel</Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
          </Dialog>

          <Dialog open={openResult} onClose={handleCloseResult}>
            <DialogTitle>Result Score of your test survey</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Your Score Are {finalResult}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleResultOk}>Ok</Button>
            </DialogActions>
          </Dialog>

          <Dialog open={overTime} onClose={handleCloseOverTime}>
            <DialogTitle>Overtime</DialogTitle>
            <DialogContent>
              <DialogContentText>Your test is overdue</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
          </Dialog>
        </Container>
      )}
    </>
  );
};

export default AnswerPage;
