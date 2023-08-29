import { Box, Button, FormControl, FormControlLabel, Input, Radio } from '@mui/material';
import React, {} from 'react';
import RemoveIcon from '@mui/icons-material/Remove';

  

const Quiz_Choice: React.FC<any> = (
    {choices, setChoices, index, handleRemoveChoice, setAnswers}) =>  {
        const handleChangeChoiceByID = (event:React.ChangeEvent<HTMLInputElement>, no:number) =>
        {
            
            setAnswers((choices:any) => {
                choices[index] = event.target.value;
                return [...choices]; // because you want updated state for anything watching for changes
            });
            setChoices(choices)
        }
    return(
        <FormControl>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        
                        <FormControlLabel
                            control={<Radio />}
                            label=""
                            value={choices[index]}
                            sx = {{ fontSize: '18px', fontWeight: 'bold', color: '#8d6e63', textShadow: '1px 1px #ffffff', marginRight: '10px', paddingTop: '5px' }}
                        />
                        <Input
                            defaultValue={`${choices[index]}`}
                            placeholder={`Input ${index+1}`}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>handleChangeChoiceByID(e,index)}
                            
                        />
                        <Button onClick={()=>handleRemoveChoice(index)} 
                        sx={{ backgroundColor: 'secondary.main', color: 'white', marginRight: '10px',borderRadius: 30 }}>
                        <RemoveIcon/>
                        </Button>
                        </Box>
        </FormControl>
    );
}

export default Quiz_Choice;