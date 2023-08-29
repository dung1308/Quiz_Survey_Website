import React, { useState } from 'react';
import { Box, Card, Button, Tooltip } from '@mui/material';

interface Slide {
  question: string,
  choices: any,
  type: string;
  answer: any,
}

interface SliderProps {
  slides: Slide[];
  setSlideIndex:any,
  scrollRefs:any,
}

const SliderComponent_Answer: React.FC<SliderProps> = ({ slides, setSlideIndex, scrollRefs}) => {
  const [slideData, setSlideData] = useState(slides);
  const [slidePos, setSlidePos] = useState(0);
  

  const handleCardClick = (no: number) => {
    setSlidePos(no);
    setSlideIndex(no);
    scrollRefs.current[no]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center'}}>
          <Box sx={{ mt: 2, flexDirection: 'row-reverse', alignItems: 'center', height: '100vh'  }}>
          
          </Box>

          {/* Pages */}
          <Box sx = {{flexDirection: 'row-reverse', alignItems: 'center' }}>
          {slideData.map((slide, index) => (
                            <div ref={(el) => (scrollRefs.current[index] = el)}>
                            <Card sx={{p: 2, m:2, width:3/4, textAlign:'center', 
                            ':hover': {boxShadow: 20},
                            borderColor: slidePos === index ? '#ADD8E6' : '',
                            borderWidth: slidePos === index ? 4 : 1,
                            borderStyle: 'solid',
                            backgroundColor: slidePos === index ? 'lightgray' : '', }} key={index} 
                            onClick={() => handleCardClick(index)}
                            >
                              <h2>{index+1}</h2>
                              <p>{slide.question}</p>
                            </Card>
                            </div>
          ))}
          </Box>
      </Box>
    </Box>
  );
};

export default SliderComponent_Answer;