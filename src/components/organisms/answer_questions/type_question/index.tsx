import React, {} from 'react';
import {Card, CardContent, List, Box, Button, Grid, ListItem, TextField, Typography} from '@mui/material';
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
            
                <Card>
                <CardContent>
                <Typography>{index}. {question}</Typography>
                    <List>
                        <ListItem>
                            <TextField
                                placeholder="Fill in your answer"
                                multiline
                                rows={5}
                                maxRows={7}
                                inputProps={{ minLength: 50 }}
                            />
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        </Box>
    );
};
  
export default Type_Answer;