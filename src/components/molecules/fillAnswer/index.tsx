import React from 'react';
import {Box, Input, InputLabel, InputAdornment, FormControl, Checkbox} from '@mui/material';

const FillAnswerRadioBtn: React.FC<any> = (
    {answerLabel, value, defaultValue}) => {

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
          sx = {{ fontSize: '18px', fontWeight: 'bold', color: '#8d6e63', textShadow: '1px 1px #ffffff', marginRight: '10px', paddingTop: '5px' }}
          defaultValue = {`${defaultValue}`}
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

export default FillAnswerRadioBtn