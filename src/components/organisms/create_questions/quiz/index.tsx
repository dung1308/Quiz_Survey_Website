import React, {} from 'react';
import {Card, CardContent, Box, Button, Grid, TextField, List, ListItem} from '@mui/material';
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
            
            <Card>
                <CardContent>
                    <TextField id="filled-basic" label="Question" variant="filled" />
                    <List>
                    <ListItem>
                        <FillAnswer answerLabel = {'Answer 1'} value={1} />
                    </ListItem>
                    <ListItem>
                        <FillAnswer answerLabel = {'Answer 2'} value={2} />
                    </ListItem>
                    <ListItem>
                        <FillAnswer answerLabel = {'Answer 3'} value={3} />
                    </ListItem>
                    <ListItem>
                        <FillAnswer answerLabel = {'Answer 4'} value={4} />
                    </ListItem>
                    </List>
                </CardContent>
            </Card>
        </Box>
    );
};
  
export default Quiz_Template;