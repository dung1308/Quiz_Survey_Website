import React, {} from 'react';
import {Box, Button, Grid, TextField, Typography} from '@mui/material';
import FillAnswer from '../../../molecules/fillAnswer';

interface Props {
    question: string;
    answer: string;
    onAnswer: (answer: string) => void;
}
  
const Type_Answer: React.FC<any> = (
    {index, question}) => {
    
    return (
        <Box sx = {{display: 'flex', justifyContent: 'center', textAlign: '-webkit-center' }}>
            <Box sx={{m:2}}>
            <Typography>{index}. {question}</Typography>
            </Box>
            <Box>
                <TextField
                    placeholder="Fill in your answer"
                    multiline
                    rows={5}
                    maxRows={7}
                    inputProps={{ minLength: 50 }}
                />
            </Box>
        </Box>
    );
};
  
export default Type_Answer;