import React, {} from 'react';
import Layout from '../../components/templates/layout';
import {Box, Container, CssBaseline, Grid, Typography, TextField, FormControl, InputLabel, MenuItem,SelectChangeEvent, Select, Button } from '@mui/material';

import SliderComponent from '../../components/organisms/create_questions/page_slider';
import Quiz_Template from '../../components/organisms/create_questions/quiz';
import Type_Question from '../../components/organisms/create_questions/type_question';
import Multi_Ans_Quiz_Template from '../../components/organisms/create_questions/multiAnsQuiz';


export const questions_test = [
    {
        no:1,
        type: '',
    }
]
// const questions = [
//     {
//         no:1,
//         question: 'What is the capital of France?',
//         choices: ['Paris', 'London', 'New York'],
//         type: 'Quiz',
//         answer: 'Paris',
//         select: false,
//     },
//     {
//         no:2,
//         question: 'What is the largest planet in our solar system?',
//         choices: ['Mars', 'Jupiter', 'Venus'],
//         type: 'Quiz',
//         answer: 'Jupiter',
//     },
//     {
//         no:3,
//         question: 'What is the boiling point of water?',
//         choices: ['100°C', '0°C', '50°C'],
//         type: 'Quiz',
//         answer: '100°C',
//     },
//     {
//         no:4,
//         question: 'What is the largest planet in our solar system?',
//         choices: ['Mars', 'Jupiter', 'Venus'],
//         type: 'Quiz',
//         answer: 'Jupiter',
//     },
//     {
//         no:5,
//         question: 'What is the boiling point of water?',
//         type: 'Type Answer',
//     },
//     {
//         no:6,
//         question: 'What is the largest planet in our solar system?',
//         choices: ['Mars', 'Jupiter', 'Venus', 'Earth'],
//         type: 'Quiz',
//         answer: 'Jupiter',
//     },
// ];
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
        type: 'Multi Answer Question',
        answer: 'Jupiter',
    },
];
//const slides = questions_test.map(x=>({no: x.no, type: ''}))
    const slides = questions.map(x=>({no: x.no, type: x.question})) 

const CreateSurvey: React.FC<any>  = () =>  {
    //const [data, setData] = React.useState(questions_test); // Temporary Database
    const [data, setData] = React.useState(questions); // Use for edit page
    const [seed, setSeed] = React.useState(1); // Reload State


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
        setSeed(Math.random());
      };
    const [type, setType] = React.useState('');
    const handleChange = (index: number,event: SelectChangeEvent) => {
        setDataType(index,event.target.value as string);
        setSeed(Math.random());
    };
    

    return(
        <Box sx={{ width: '100%',}}>
            <CssBaseline/>
            <Layout/>
            <Container maxWidth={false} disableGutters sx={{ display: 'inline-flex'}}>

                {/*Page Slider*/}

                <Box
                sx={{
                    width: 1/4,
                    backgroundColor: '#A0B3A0',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'auto'
                }}
                >
       
                    <SliderComponent slides={slides} setSlideIndex = {setSlideIndex} addData = {addData}/>
                    
                </Box>

                {/*Making Quiz*/}
                {data.map((question, index) => (
                    (slideIndex === index  && 
                    <Box
                            sx={{
                                width: 2/4,
                                textAlign: '-webkit-center',
                            }}
                            key = {index}
                    >
                        <h1 className="text-center">Create Questions</h1>
                        <h2 className="text-center">Question {index + 1}</h2>
                        <div>
                            
                            {getDataType(index) === "Quiz" && <Quiz_Template index={index + 1} question = {question.question} answers = {question.choices}/>}
                            {getDataType(index) === "Type Answer" && <Type_Question/>}
                            {getDataType(index) === "Multi Answer Question" && <Multi_Ans_Quiz_Template answer index={index + 1} question = {question.question} answers = {question.choices}/>}
                        </div>

                    </Box>)))}
                

                {/*Setup Type, Timer*/}


                <Box

                sx={{
                    width: 1/4,
                    backgroundColor: '#5770B2', flexDirection: 'column', justifyContent: 'end',
                    textAlign: '-webkit-center',
                    overflow: 'auto',
                }}
                >

                    {/*Question Type*/}

                    <Box sx={{m:2}} >
                        <Grid sx={{
                        backgroundColor: '#C4C4C4',
                        width: 1/2,
                        textAlign: 'center'}}
                        >
                            <Typography variant="h5" sx={{color:'#2AA789'}}>Question Type</Typography>
                        </Grid>
                    </Box>

                    <Box sx={{m:2}} >
                        <FormControl fullWidth sx={{
                        backgroundColor: '#C4C4C4',
                        width: 1/2,
                        textAlign: 'center'}}>
                        <InputLabel id="demo-simple-select-label" color='primary' sx={{fontWeight: 'bold', color:'#000000'}}>Quiz Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            label="question type"
                            onChange={event => handleChange(slideIndex, event)}
                        >
                            <MenuItem value={'Quiz'}>Quiz</MenuItem>
                            <MenuItem value={'Type Answer'}>Type Answer</MenuItem>
                            <MenuItem value={'Multi Answer Question'}>Multi Answer Question</MenuItem>
                        </Select>
                        </FormControl>
                    </Box>


                    {/*Timer*/}

                    <Grid sx={{
                    backgroundColor: '#C4C4C4',
                    width: 1/2,
                    textAlign: 'center'}}
                    >
                    <Typography variant="h5" sx={{color:'#2AA789'}}>Set Timer</Typography>
                    </Grid>

                    <Grid sx={{
                    backgroundColor: '#C4C4C4',
                    width: 1/2,
                    textAlign: 'center'
                    }}>
                        <Box>
                        <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} sx= {{width: 3/4}}/>
                        </Box>
                    </Grid>
                    <Box sx={{m:2}} >
                        <Button color='warning' variant="contained" sx = {{color:'#52DB4B', backgroundColor:'#DB7A35'}} href='/surveys'>Save</Button>
                    </Box>
                </Box>

            </Container>
        </Box>
    );
}

export default CreateSurvey;