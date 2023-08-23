import React, {} from 'react';
import {Box, Button, Grid, TextField, Typography} from '@mui/material';
import AnswerChoice from '../../../molecules/answer_choices';

interface Props {
    question: string;
    choices: string[];
    answer: string;
    onAnswer: (answer: string) => void;
}
  
const Quiz_Answer: React.FC<any> = (
    {index, question, answers}) => {
    
    
    
    return (
        <Box sx = {{display: 'flex', justifyContent: 'center', textAlign: '-webkit-center' }}>
            <Typography>{index}. {question}</Typography>
            <Box>
                <AnswerChoice answerLabel = {'Answer 1'} answer = {answers[0]} value={1}/>
                <AnswerChoice answerLabel = {'Answer 2'} answer = {answers[1]} value={2}/>
                <AnswerChoice answerLabel = {'Answer 3'} answer = {answers[2]} value={3}/>
                <AnswerChoice answerLabel = {'Answer 4'} answer = {answers[3]} value={4}/>
            </Box>
        </Box>
    );
};
  
export default Quiz_Answer;