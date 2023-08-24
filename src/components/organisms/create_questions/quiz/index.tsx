import React, {useState} from 'react';
import {Radio, FormControlLabel, FormControl, FormLabel, Input, InputAdornment, RadioGroup, Card, CardContent, Box, Button, Grid, TextField, List, ListItem} from '@mui/material';
import FillAnswer from '../../../molecules/fillAnswer';
import { createTheme } from '@mui/material/styles';

interface Props {
    question: string;
    choices: string[];
    answer: string;
    onAnswer: (answer: string) => void;
}
  
const Quiz_Template: React.FC<any> = (
    {index, question, answers = []}) => {
        const theme = createTheme();
        const [inputs, setInputs] = useState<{ label: string; value: number; placeholder: string; checked: boolean }[]>([{ label: '', value: 1, placeholder: '', checked: false }]);
        const [answers_Quiz, setAnswers_Quiz] = useState(answers);

        const handleAddInput = () => {
            const newInput = { label: '', value: inputs.length + 1, placeholder: '', checked: false };
            setInputs([...inputs, newInput]);
            answers_Quiz.push('')
           
        };

        const handleInputChange = (index: number) => {
            const updatedInputs = inputs.map((input, i) => ({
            ...input,
            checked: i === index ? !input.checked : false,
            }));
            setInputs(updatedInputs);
     };
    
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
                <TextField
                label="Question"
                variant="outlined"
                fullWidth
                    sx={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#8d6e63',
                    textShadow: '1px 1px #ffffff',
                    backgroundColor: '#ffffff',
                    border: '2px solid #8d6e63',
                    borderRadius: '5px',
                    padding: '10px',
                    marginBottom: '20px',}}
                defaultValue={question}
                />                
                <FormControl component="fieldset">
                <FormLabel component="legend">Radio Button Group</FormLabel>
                <RadioGroup>
                    {answers_Quiz.map((answer:string, index:number) => (
                    <FormControl key={index}>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <FormControlLabel
                            control={<Radio />}
                            label=""
                            value={index}
                            onChange={() => handleInputChange(index)}
                            sx = {{ fontSize: '18px', fontWeight: 'bold', color: '#8d6e63', textShadow: '1px 1px #ffffff', marginRight: '10px', paddingTop: '5px' }}
                        />
                        <Input
                            defaultValue={`${answer}`}
                            placeholder={`Input ${index+1}`}
                            onChange={(event) => handleInputChange(index)}
                        />
                        </Box>
                    </FormControl>
                    ))}
                </RadioGroup>
                </FormControl>
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button onClick={handleAddInput} sx={{ backgroundColor: '#8d6e63', color: '#ffffff', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer' }}>Add Input</Button>
            </Box>
            </Card>
        </Box>
    );
};
  
export default Quiz_Template;