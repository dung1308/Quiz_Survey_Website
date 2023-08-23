import React, {} from 'react';
import {Card, CardContent, Box, Button, Grid, TextField} from '@mui/material';
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
            <Card>
                <CardContent>
                    <TextField id="filled-basic" label="Question" variant="filled" />
                </CardContent>
            </Card>
        </Box>
    );
};
  
export default Type_Question;