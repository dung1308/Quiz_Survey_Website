import React, {} from 'react';
import {Box, Button, Grid, TextField} from '@mui/material';
import FillAnswer from '../../../molecules/fillAnswer';


interface Props {
    question: string;
    choices: string[];
    answer: string;
    onAnswer: (answer: string) => void;
}
  
const Quiz_Template: React.FC<any> = (
    {}) => {
    
    return (
        <Box sx = {{display: 'flex', justifyContent: 'center', textAlign: '-webkit-center' }}>
            <TextField id="filled-basic" label="Question" variant="filled" />
            <Box>
                <FillAnswer answerLabel = {'Answer 1'} value={1}/>
                <FillAnswer answerLabel = {'Answer 2'} value={2}/>
                <FillAnswer answerLabel = {'Answer 3'} value={3}/>
                <FillAnswer answerLabel = {'Answer 4'} value={4}/>
            </Box>
        </Box>
    );
};
  
export default Quiz_Template;