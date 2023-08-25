import React, { useState } from 'react';
import { Box, Card, Button, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
  const [slidePos, setSlidePos] = useState(0);
  const scrollRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  

  const handleCardClick = (no: number) => {
    setSlidePos(no);

    setSlideIndex(no);
    scrollRefs.current[no]?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const addSlide = () => {
    const newSlide: Slide = {
      no: slideData.length+1,
      type: '',
    };
    
    setSlideData([...slideData, newSlide])
    addData(newSlide);
    setTimeout(() => {
      scrollRefs.current[slideData.length]?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 0);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'flex-end',  }}>
        {/* Pages */}
        <Tooltip title={slideData.map((slide, index) => `${index + 1}. ${slide.no}`).join('\n')}>
          <Box sx={{ flexDirection: 'row-reverse', alignItems: 'center', height: 'calc(100vh - 40px)' }}>
            {slideData.map((slide, index) => (
              <div ref={(el) => (scrollRefs.current[index] = el)}>
              <Card
                sx={{ p: 2, m: 2, marginBottom:'2', width: '75%', textAlign: 'center', 
                ':hover': { boxShadow: 20 }, 
                borderColor: slidePos === index ? '#ADD8E6' : '',
                borderWidth: slidePos === index ? 4 : 1,
                borderStyle: 'solid',
                backgroundColor: slidePos === index ? 'lightgray' : '', }}
                onClick={() => handleCardClick(index)}
              >
                
                <h2>{slide.no}</h2>
                <p>{slide.type}</p>
              </Card>
              </div>
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