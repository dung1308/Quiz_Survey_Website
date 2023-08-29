import React, {} from 'react';
import {Radio, FormControlLabel, FormControl, FormLabel, Input, InputAdornment, RadioGroup,Card, CardContent,List, ListItem,Box, Button, Grid, TextField, Typography} from '@mui/material';
import AnswerChoice from '../../../molecules/answer_choices';

interface Props {
    question: string;
    choices: string[];
    answer: string;
    onAnswer: (answer: string) => void;
}
  
const Quiz_Answer: React.FC<any> = (
    {index, question, answers}) => {
    
        const [inputs, setInputs] = React.useState<{ label: string; value: number; placeholder: string; checked: boolean }[]>([{ label: '', value: 1, placeholder: '', checked: false }]);

        const handleAddInput = () => {
          const newInput = { label: '', value: inputs.length + 1, placeholder: '', checked: false };
          setInputs([...inputs, newInput]);
        };
        const [selectedValue, setSelectedValue] = React.useState('a');

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setSelectedValue(event.target.value);
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
                padding: '20px',
                width:'100%',
                maxWidth: '500px'}}>
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
                    marginBottom: '20px',}}>{index}.{question}</Typography>
                <FormControl component="fieldset">
                <FormLabel component="legend">Radio Button Group</FormLabel>
                <RadioGroup>
                    {answers.map((answer:string, index:number) => (
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
                            value={`${answer}`}
                            onChange={(event) => handleInputChange(index)}
                        />
                        </Box>
                    </FormControl>
                    ))}
                </RadioGroup>
                </FormControl>
            </CardContent>
            </Card>
        </Box>
    );
};
  
export default Quiz_Answer;