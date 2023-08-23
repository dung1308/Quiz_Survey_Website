import React, {} from 'react';
import {Card, CardContent,List, ListItem,Box, Button, Grid, TextField, Typography} from '@mui/material';
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
            <Card>
                <CardContent>
                    <Typography>{index}. {question}</Typography>
                    <List>
                        {answers.map((answer:string, index:number) => (
                            <ListItem>
                            <AnswerChoice answerLabel = {`Answer ${index}`} answer = {answer} value={index}/>
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>
        </Box>
    );
};
  
export default Quiz_Answer;