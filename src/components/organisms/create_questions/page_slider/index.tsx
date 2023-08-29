import React, { useState } from 'react';
import {CardHeader, IconButton, Box, Card, Button, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

interface Slide {
  question: string,
  choices: string[],
  type: string;
  answer: string[],
}

interface SliderProps {
  slides: Slide[];
  setSlideIndex:any,
  slideIndex:number,
  data:any, 
  setData:any
}

const SliderComponent: React.FC<SliderProps> = ({ slides, setSlideIndex, slideIndex, data, setData}) => {
  const [slidePos, setSlidePos] = useState(0);
  const scrollRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  

  const handleCardClick = (no: number) => {
    setSlidePos(no);

    setSlideIndex(no);
    scrollRefs.current[no]?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const addSlide = () => {
    const newSlide: Slide = {
      question: '',
      choices:['','','',''],
      type: 'Quiz',
      answer: [''],
    };
    setData([...data,newSlide])

    setTimeout(() => {
      setSlidePos(data.length)
      setSlideIndex(data.length)
      scrollRefs.current[data.length]?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 0);
  };

  const removeData = (index:number) => {
    if (data.length > 1){
      setData([
        ...data.slice(0, index),
        ...data.slice(index + 1, data.length)
      ]);
      if (index > 1){
      setTimeout(() => {
        setSlidePos(index-1)
        setSlideIndex(index-1)
        scrollRefs.current[index-1]?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 0);}
      else{
        setTimeout(() => {
          setSlidePos(0)
          setSlideIndex(0)
          scrollRefs.current[0]?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 0);
      }
    }
  }

  // Line break when number of characters reaching MAX_CHARS
  const MAX_CHARS = 20;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'flex-end',  }}>
        {/* Pages */}
          <Box sx={{ flexDirection: 'row-reverse', alignItems: 'center', height: 'calc(100vh - 40px)' }}>
            {data.map((slide:Slide, index:number) => (
              <div ref={(el) => (scrollRefs.current[index] = el)}>
              <Card
                sx={{ p: 2, m: 2, marginBottom:'2', maxWidth: '250px',width: '100%', textAlign: 'center', 
                ':hover': { boxShadow: 20 }, 
                borderColor: slidePos === index ? '#ADD8E6' : '',
                borderWidth: slidePos === index ? 4 : 1,
                borderStyle: 'solid',
                backgroundColor: slidePos === index ? 'lightgray' : '', 
                overflow: 'auto',
                }}
                onClick={() => handleCardClick(index)}
              >
                <CardHeader
                  action={
                    <IconButton aria-label="close" onClick={() => removeData(index)}>
                      <CloseIcon />
                    </IconButton>
                  }
                />
                
                <h2>{index+1}</h2>
                <Typography >
                  {slide.question.match(new RegExp(`.{1,${MAX_CHARS}}`, 'g'))?.join('\n')}
                  </Typography>
              </Card>

              </div>
            ))}
            <Box sx = {{textAlign: 'center', bottom: 0, left:0}}>
                {/* Button Add Slide */}
                <Button onClick={addSlide} sx={{ backgroundColor: 'primary.main', color: 'white', 
                position: 'fixed',
                bottom:0, left:0 }}>
                  <AddIcon/>
                </Button>
            </Box>

          </Box>
      </Box>
    </Box>
  );
};

export default SliderComponent;