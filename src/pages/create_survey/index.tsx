import React, {} from 'react';
import Layout from '../../components/templates/layout';import {Box, Container, CssBaseline, Grid, Typography, TextField, FormControl, InputLabel, MenuItem,SelectChangeEvent, Select, Button } from '@mui/material';

import SliderComponent from '../../components/organisms/create_questions/page_slider';
import Quiz_Template from '../../components/organisms/create_questions/quiz';
import Type_Question from '../../components/organisms/create_questions/type_question';


export const questions_test = [
    {
        no:1,
        type: '',
    }
]


const slides = questions_test.map(x=>({no: x.no, type: ''}))


const CreateSurvey: React.FC<any>  = () =>  {
    const [data, setData] = React.useState(questions_test); // Temporary Database
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
       
                    <SliderComponent slides={slides} setSlideIndex = {setSlideIndex} addData = {addData}/>
                    
                </Box>

                {/*Making Quiz*/}
                {data.map((question, index) => (
                    (slideIndex === index  && 
                    <Box key = {seed}
                            sx={{
                                width: 2/4,
                                height: '100vh',
                                textAlign: '-webkit-center',
                            }}
                    >
                        <div>
                            <h1 className="text-center">Quiz App</h1>
                            {getDataType(index) === "Quiz" && <Quiz_Template/>}
                            {getDataType(index) === "Type Answer" && <Type_Question/>}
                        </div>

                    </Box>)))}
                

                {/*Setup Type, Timer*/}


                <Box

                sx={{
                    width: 1/4,
                    height: '100vh',
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
                        <Button color='warning' variant="contained" sx = {{color:'#52DB4B', backgroundColor:'#DB7A35'}}>Save</Button>
                    </Box>
                </Box>

            </Container>
        </>
    );
}

export default CreateSurvey;