import React, {useState} from 'react';
import {Typography, Radio, FormControlLabel, FormControl, FormLabel, Input, InputAdornment, RadioGroup, Card, CardContent, Box, Button, Grid, TextField, List, ListItem} from '@mui/material';
import AnswerChoice from '../../../molecules/answer_choices';

import { createTheme } from '@mui/material/styles';

interface Props {
    question: string;
    choices: string[];
    answer: string;
    onAnswer: (answer: string) => void;
}
  
const Multi_Ans_Quiz_Answer: React.FC<any> = (
    {index, question, answers}) => {
    
    return (
        <Box sx = {{display: 'flex', justifyContent: 'center', textAlign: '-webkit-center' }}>
            <Card sx = {{
            backgroundImage: `url('https://www.transparenttextures.com/patterns/leather.png')`,
            backgroundColor: '#f5deb3',
            border: 2,
            borderColor: '#8d6e63',
            borderRadius: '10px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
            padding: '20px',}}>
                <CardContent>
                    <Typography sx={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#8d6e63',
                    textShadow: '1px 1px #ffffff',
                    border: '2px solid #8d6e63',
                    borderRadius: '5px',
                    padding: '10px',
                    marginBottom: '20px',}}>{index}.{question}</Typography>
                    <List>
                        {answers.map((answer:string, index:number) => (
                            <ListItem>
                                <AnswerChoice answerLabel = {`Answer ${index+1}`} answer = {answer} value={index + 1}/>
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
                </Card>
            
            
        </Box>
    );
};
  
export default Multi_Ans_Quiz_Answer;