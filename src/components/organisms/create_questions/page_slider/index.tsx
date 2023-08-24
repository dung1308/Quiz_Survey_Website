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

const SliderComponent: React.FC<SliderProps> = ({ slides, setSlideIndex, addData}) => {
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
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'flex-end',  }}>
        {/* Pages */}
        <Tooltip title={slideData.map((slide, index) => `${index + 1}. ${slide.no}`).join('\n')}>
          <Box sx={{ flexDirection: 'row-reverse', alignItems: 'center', height: 'calc(100vh - 40px)' }}>
            {slideData.map((slide, index) => (
              <Card
                sx={{ p: 2, m: 2, marginBottom:'2', width: '75%', textAlign: 'center', ':hover': { boxShadow: 20 } }}
                key={index}
                onClick={() => handleCardClick(index)}
              >
                <h2>{slide.no}</h2>
              </Card>
            ))}
          </Box>
        </Tooltip>
        <Box sx={{ position: 'fixed', bottom: '20px', left:'1px', display: 'flex', justifyContent: 'center' }}>
          {/* Button Add Slide */}
          <Button onClick={addSlide} sx={{ backgroundColor: 'primary.main', color: 'white' }}>
            Add Slide
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SliderComponent;