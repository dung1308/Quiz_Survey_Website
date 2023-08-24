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
            <Card className="custom-card" sx = {{
                backgroundImage: `url('https://www.transparenttextures.com/patterns/leather.png')`,
                backgroundColor: '#f5deb3',
                border: 2,
                borderColor: '#8d6e63',
                borderRadius: '10px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                padding: '20px',}}>
                <CardContent>
                    <TextField id="filled-basic" label="Question" variant="filled" 
                    sx={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#8d6e63',
                        textShadow: '1px 1px #ffffff',
                        backgroundColor: '#ffffff',
                        border: '2px solid #8d6e63',
                        borderRadius: '5px',
                        padding: '10px',
                        marginBottom: '20px',}}/>
                </CardContent>
            </Card>
        </Box>
    );
};
  
export default Type_Question;