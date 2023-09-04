import React, {useState} from 'react';
import {Radio, FormControlLabel, FormControl, FormLabel, Input, InputAdornment, RadioGroup, Card, CardContent, Box, Button, Grid, TextField, List, ListItem} from '@mui/material';

import { createTheme } from '@mui/material/styles';
import RemoveIcon from '@mui/icons-material/Remove';
import FillAnswer from '../../../molecules/fillAnswer';

interface Props {
    question: string;
    choices: string[];
    answer: string;
    onAnswer: (answer: string) => void;
}
  
const Multi_Ans_Quiz_Template: React.FC<any> = (
    {choices, setChoices, setQuestion, question}) => {
        // const theme = createTheme();
        // const [inputs, setInputs] = useState<{ label: string; value: number; placeholder: string; checked: boolean }[]>([{ label: '', value: 1, placeholder: '', checked: false }]);
        // const handleAddInput = () => {
        //     const newInput = { label: '', value: inputs.length + 1, placeholder: '', checked: false };
        //     const new_question = [
        //         {
        //             question: '',
        //             choices: [],
        //             type: '',
        //             answer: '',
        //         }
        //     ]
        //     setInputs([...inputs, newInput]);
        //     //answers_Quiz.push('');
        //     setData((data:any) => {
        //         data[index].choices.push('')
        //         return [...data]; // because you want updated state for anything watching for changes
        //     });
        // };
        
        // const handleChangeQuestion = (event:React.ChangeEvent<HTMLInputElement>) =>
        // {
        //     setData((data:any) => {
        //         data[index].question = event.target.value;
        //         return [...data]; // because you want updated state for anything watching for changes
        //     });
        // }

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
        // const handleRemoveChoice = (no:number) => {
        //     if (data[index].choices.length > 2)
        //     {   
        //         setData((data:any) => {
        //             data[index].choices.splice(no, 1);
        //             return [...data];
        //         });
                
        //     }

        // };

        // const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        //     const { id, checked } = event.target;
        //     if (checked) {
        //       setData((data:any) => {
        //         data[index].choices.splice(id, 1);
        //         return [...data];
        //     })
        //     }
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
    
    return (        <List>
                        {choices.map((answer:string, index:number) => (
                        <ListItem key={index}>
                            <FillAnswer answers={answers} index={index} setAnswers={setAnswers} 
                            setChoices={setChoices} setQuestion = {setQuestion} question = {question}/>

                            <Button onClick={()=>handleRemoveChoice(index)} 
                            sx={{ backgroundColor: 'secondary.main', color: 'white', marginRight: '10px',borderRadius: 30 }}>
                            <RemoveIcon/>
                            </Button>
                        </ListItem>
                        ))}
                        {answers.length < 8 && 
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <Button onClick={handleAddInput} sx={{ backgroundColor: '#8d6e63', color: '#ffffff', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer' }}>Add Input</Button>
                        </Box>}
                    </List>
                    

    );
};
  
export default Multi_Ans_Quiz_Template;