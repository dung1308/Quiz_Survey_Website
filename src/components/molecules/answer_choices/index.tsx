import React from 'react';
import {Box, Input, InputLabel, InputAdornment, FormControl, Checkbox} from '@mui/material';

const AnswerChoice: React.FC<any> = (
    {answerLabel, answer, value}) => {

  const [checked, setChecked] = React.useState(true);

  const handleChange = () => {
    setChecked(checked => !checked);
  };

  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <FormControl variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">
          {answerLabel}
        </InputLabel>
        <Input disabled
          id="input-with-icon-adornment" value = {answer}
          startAdornment={
            <InputAdornment position="start">
              <Checkbox
                value={value}
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

export default AnswerChoice