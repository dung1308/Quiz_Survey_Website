import React from 'react';
import {Box, Input, InputLabel, InputAdornment, FormControl, Checkbox, Typography, FormControlLabel} from '@mui/material';

const AnswerChoice: React.FC<any> = (
    {answerLabel, answer, value}) => {

  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(checked => !checked);
  };

  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <FormControl variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">
          {answerLabel}
        </InputLabel>
        <Input
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
        {/* <FormControlLabel
            control={<Checkbox value={value}
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }} />}
            label={<Typography variant="body1">{answer}</Typography>}
    /> */}
      </FormControl>
    </Box>
  );
}

export default AnswerChoice