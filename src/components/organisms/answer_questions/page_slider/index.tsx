import React, { useState } from 'react';
import { Box, Card, Button, Tooltip } from '@mui/material';

interface Slide {
  no: number;
  type: string;
}

interface SliderProps {
  slides: Slide[];
  setSlideIndex:any,
  addData:any,
}

const SliderComponent_Answer: React.FC<SliderProps> = ({ slides, setSlideIndex, addData}) => {
  const [slideData, setSlideData] = useState(slides);
  

  const handleCardClick = (no: number) => {
    setSlideIndex(no);
  };
  
  const addSlide = () => {
    const newSlide: Slide = {
      no: slideData.length+1,
      type: '',
    };
    
    setSlideData([...slideData, newSlide])
    addData(newSlide);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center'}}>
          <Box sx={{ mt: 2, flexDirection: 'row-reverse', alignItems: 'center', height: '100vh'  }}>
          
          </Box>

          {/* Pages */}
          <Tooltip title={slideData.map((slide, index) => `${index + 1}. ${slide.no}`).join('\n')}>
          <Box sx = {{flexDirection: 'row-reverse', alignItems: 'center', height: '100vh' }}>
          {slideData.map((slide, index) => (
                            <Card  sx={{ p: 2, m:2, width:3/4, textAlign:'center', ':hover': {
                              boxShadow: 20}}} key={index} 
                            onClick={() => handleCardClick(index)}
                            >
                              <h2>{slide.no}</h2>
                              <p>{slide.type}</p>
                            </Card>
          ))}
          </Box>
          </Tooltip>
      </Box>
    </Box>
  );
};

export default SliderComponent_Answer;