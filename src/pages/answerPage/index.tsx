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
} from "@mui/material";
import Timer_Answer from "../../components/atoms/timer";
import Quiz_Answer from "../../components/organisms/answer_questions/quiz";
import SliderComponent_Answer from "../../components/organisms/answer_questions/page_slider";
import Type_Answer from "../../components/organisms/answer_questions/type_question";
import Multi_Ans_Quiz_Answer from "../../components/organisms/answer_questions/multiAnsQuiz";
import { useParams } from "react-router-dom";
import {
  Question,
  Survey,
  getSurveyByID,
} from "../../services/dataService/dataService";

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

const AnswerPage: React.FC<any> = () => {
  const params = useParams();

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

  const [data, setData] = React.useState<Question[]>(questions_sample); // Temporary Database
  const [time, setTime] = React.useState<number>(100);

  const calculateTime = (time: any) => {
    let matches = time.match(/\d+/g);
    const totalTime = ((+matches[0]) * 60 + (+matches[1]));
    return totalTime;
  };

  useEffect(() => {
    if (params.surveyId !== undefined) {
      const newSur: Survey = getSurveyByID(params.surveyId);
      const definedQuestion: Question[] = newSur.questions;
      if (params.surveyId !== undefined) {
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
        setData(definedQuestion);
      }
    }
  }, [params.surveyId]);
  const slides = data.map((x) => ({
    question: x.question,
    choices: x.choices,
    type: x.type,
    answer: x.answer,
  }));
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

  return (
    <>
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
                {getDataType(index) === "Quiz" && (
                  <Quiz_Answer
                    index={index + 1}
                    question={question.question}
                    answers={question.choices}
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
                )}
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
            <Timer_Answer time={calculateTime(tempSur.timer)} />
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
              onClick={() => console.log("Submit button clicked!")}
              href="/"
            >
              Submit
            </Button>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default AnswerPage;
