import React from 'react';
import {Box, Input, InputLabel, InputAdornment, FormControl, Checkbox} from '@mui/material';

const FillAnswer: React.FC<any> = (
    {answers, index, setAnswers, setChoices}) => {

  const [checked, setChecked] = React.useState(true);

  const handleChange = () => {
    setChecked(checked => !checked);
  };
  const handleChangeChoiceByID = (event:React.ChangeEvent<HTMLInputElement>, no:number) =>
        {
            
            setAnswers((answers:any) => {
                answers[index] = event.target.value;
                return [...answers]; // because you want updated state for anything watching for changes
            });
            setChoices(answers)
        }

  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <FormControl variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">
          Answer {index+1}
        </InputLabel>
        <Input
          id="input-with-icon-adornment" placeholder="Fill in your answer"
          sx = {{ fontSize: '18px', fontWeight: 'bold', color: '#8d6e63', textShadow: '1px 1px #ffffff', marginRight: '10px', paddingTop: '5px' }}
          defaultValue = {`${answers[index]}`}
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>handleChangeChoiceByID(e,index)}
          startAdornment={
            <InputAdornment position="start">
              <Checkbox
                value={index}
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
                
              />
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
}

export default FillAnswer