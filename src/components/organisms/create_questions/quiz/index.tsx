import React, {useState} from 'react';
import {Radio, FormControlLabel, FormControl, FormLabel, Input, InputAdornment, RadioGroup, Card, CardContent, Box, Button, Grid, TextField, List, ListItem} from '@mui/material';
import FillAnswer from '../../../molecules/fillAnswer';
import { createTheme } from '@mui/material/styles';
import RemoveIcon from '@mui/icons-material/Remove';
import Quiz_Choice from '../../../molecules/quiz_choice';

  
const Quiz_Template: React.FC<any> = (
    {choices, setChoices, setQuestion, question}: any) => {
        // const [answers_Quiz, setAnswers_Quiz] = useState(answers);

        

        // const handleChangeChoiceByID = (event:React.ChangeEvent<HTMLInputElement>, no:number) =>
        // {
            
        //     setData((data:any) => {
        //         data[index].choices[no] = event.target.value;
        //         return [...data]; // because you want updated state for anything watching for changes
        //     });
        // }
        
        // const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
        //     setData((data:any) => {
        //         data[index].answer = event.target.value;
        //         return [...data]; // because you want updated state for anything watching for changes
        //     });
        // };

        const [answers, setAnswers] = useState(choices.map((choice:string) => String(choice)));

        const handleRemoveChoice = (no:number) => {
            if (choices.length > 2)
            {   
                setAnswers((question:any) => {
                    answers.splice(no, 1);
                    return question;
                });
                setChoices(answers)
                
            }

        }
        

        const handleAddInput = () => {
            if (answers.length < 8){
            answers.push('');
            setAnswers(answers)
            setChoices(answers)}
            // setAnswers((question:any) => {
                
            //     return question; // because you want updated state for anything watching for changes
            // });
            // setChoices(choices.push(''))
        };

        
        
    
    return (
                <FormControl component="fieldset">
                <FormLabel component="legend">Radio Button Group</FormLabel>
                <RadioGroup onChange={(args) => {setQuestion({ ...question, answer: args.target.value });}
                } >
                    
                    {choices.map((answer:string, index:number) =>
                        <Quiz_Choice
                        handleRemoveChoice = {handleRemoveChoice}
                        index = {index}
                        choices = {answers}
                        setAnswers = {setAnswers}
                        setChoices = {setChoices}
                      />
                    
                      
                    )}
                </RadioGroup>
                {answers.length < 8 && 
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Button onClick={handleAddInput} sx={{ backgroundColor: '#8d6e63', color: '#ffffff', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer' }}>Add Input</Button>
                </Box>}
                </FormControl>
    );
};
  
export default Quiz_Template;