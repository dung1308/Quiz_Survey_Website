import React, {} from 'react';
import Layout from '../../components/templates/layout';
import {Button, Box, Container, CssBaseline, Grid, Typography, SelectChangeEvent} from '@mui/material';
import Timer_Answer from '../../components/atoms/timer';
import Quiz_Answer from '../../components/organisms/answer_questions/quiz';
import SliderComponent_Answer from '../../components/organisms/answer_questions/page_slider';
import Type_Answer from '../../components/organisms/answer_questions/type_question';

const questions = [
    {
        no:1,
        question: 'What is the capital of France?',
        choices: ['Paris', 'London', 'New York'],
        type: 'Quiz',
        answer: 'Paris',
        select: false,
    },
    {
        no:2,
        question: 'What is the largest planet in our solar system?',
        choices: ['Mars', 'Jupiter', 'Venus'],
        type: 'Quiz',
        answer: 'Jupiter',
    },
    {
        no:3,
        question: 'What is the boiling point of water?',
        choices: ['100°C', '0°C', '50°C'],
        type: 'Quiz',
        answer: '100°C',
    },
    {
        no:4,
        question: 'What is the largest planet in our solar system?',
        choices: ['Mars', 'Jupiter', 'Venus'],
        type: 'Quiz',
        answer: 'Jupiter',
    },
    {
        no:5,
        question: 'What is the boiling point of water?',
        type: 'Type Answer',
    },
    {
        no:6,
        question: 'What is the largest planet in our solar system?',
        choices: ['Mars', 'Jupiter', 'Venus', 'Earth'],
        type: 'Quiz',
        answer: 'Jupiter',
    },
];


const slides = questions.map(x=>({no: x.no, type: x.type}))


const AnswerPage: React.FC<any>  = (time) =>  {
    time = 1000
    const [data, setData] = React.useState(questions); // Temporary Database
    const [seed, setSeed] = React.useState(1); // Reload State
    const scrollRefs = React.useRef<Array<HTMLDivElement | null>>([]);

    const addData = (data_new:any) => {
        setData([...data,data_new])
    }
    const setDataType = (index:number, type:string) => {
        data[index].type = type
    }
    const getDataType = (index:number) => {
        return data[index].type
    }
    const [slideIndex, setSlideIndex] = React.useState(0);
    const handleCardClick = (no: number) => {
        setSlideIndex(no);
      };
    const [type, setType] = React.useState('');
    const handleChange = (index: number,event: SelectChangeEvent) => {
        setDataType(index,event.target.value as string);
        setSeed(Math.random());
    };
    

    return(
        <>
            <CssBaseline />
            <Layout/>
            <Container maxWidth={false} disableGutters sx={{ display: 'inline-flex' }}>

                {/*Page Slider*/}

                <Box
                sx={{
                    width: 1/4,
                    height: '100vh',
                    backgroundColor: '#A0B3A0',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'auto'
                }}
                >
       
                    <SliderComponent_Answer slides={slides} setSlideIndex = {setSlideIndex} scrollRefs = {scrollRefs}/>
                    
                </Box>
                <Box key = {seed}
                            sx={{
                                width: 2/4,
                                height: '100vh',
                                textAlign: '-webkit-center',
                                overflow: 'auto'
                            }}
                    >
                {/*Making Quiz*/}
                {questions.map((question, index) => (
                    (
                    <Box key = {seed}
                            sx={{
                                width: 2/4,
                                height: '100vh',
                                textAlign: '-webkit-center',
                            }}
                    >
                        <div ref={(el) => (scrollRefs.current[index] = el)}>
                            <h1 className="text-center">Question {index + 1}</h1>
                            {getDataType(index) === "Quiz" && <Quiz_Answer index={index + 1} question={question.question} answers = {question.choices}/>}
                            {getDataType(index) === "Type Answer" && <Type_Answer index={index + 1} question={question.question} />}
                        </div>

                    </Box>)))}
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Button className="submit-button" sx={{ backgroundColor: '#8d6e63', color: '#ffffff', 
                        border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer' }} 
                        onClick={() => console.log('Submit button clicked!')
                        }
                        href='/'>Submit</Button>
                    </Box>
                </Box>
                

                {/*Setup Type, Timer*/}


                <Box

                sx={{
                    width: 1/4,
                    height: '100vh',
                    backgroundColor: '#5770B2', flexDirection: 'column', justifyContent: 'end',
                    textAlign: '-webkit-center',
                    
                }}
                >


                    {/*Timer*/}

                    <Grid sx={{
                    backgroundColor: '#C4C4C4',
                    width: 1/2,
                    textAlign: 'center', m:2}}
                    >
                    <Typography variant="h5" sx={{color:'#2AA789'}}>Timer</Typography>
                    </Grid>

                    <Grid sx={{
                    backgroundColor: '#C4C4C4',
                    width: 1/2,
                    textAlign: 'center'
                    }}>
                        <Timer_Answer time={time}/>
                    </Grid>

                </Box>

            </Container>
        </>
    );
}

export default AnswerPage;