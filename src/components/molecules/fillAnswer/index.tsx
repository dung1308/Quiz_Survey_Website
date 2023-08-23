import React from 'react';
import {Box, Input, InputLabel, InputAdornment, FormControl, Checkbox} from '@mui/material';

const FillAnswer: React.FC<any> = (
    {answerLabel, value}) => {

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
        <Input
          id="input-with-icon-adornment" placeholder="Fill in your answer"
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

export default FillAnswer