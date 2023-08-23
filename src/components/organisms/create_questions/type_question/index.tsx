import React, {} from 'react';
import {Box, Button, Grid, TextField} from '@mui/material';
import FillAnswer from '../../../molecules/fillAnswer';

interface Props {
    question: string;
    answer: string;
    onAnswer: (answer: string) => void;
}
  
const Type_Question: React.FC<any> = (
    {}) => {
    
    return (
        <Box sx = {{display: 'flex', justifyContent: 'center', textAlign: '-webkit-center' }}>
            <Box sx={{m:2}}>
            <TextField id="filled-basic" label="Type Question" variant="filled" />
            </Box>
        </Box>
    );
};
  
export default Type_Question;