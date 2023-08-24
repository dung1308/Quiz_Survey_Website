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
            
                <Card className="custom-card" sx = {{
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
                    backgroundColor: '#ffffff',
                    border: '2px solid #8d6e63',
                    borderRadius: '5px',
                    padding: '10px',
                    marginBottom: '20px',}}>{index}. {question}</Typography>
                    <List>
                        <ListItem>
                            <TextField
                                placeholder="Fill in your answer"
                                multiline
                                rows={8}
                                maxRows={10}
                                inputProps={{ minLength: 50 }}
                                sx = {{ fontSize: '18px', fontWeight: 'bold', color: '#8d6e63', 
                                textShadow: '1px 1px #ffffff', marginRight: '10px', paddingTop: '5px' }}
                            />
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        </Box>
    );
};
  
export default Type_Answer;