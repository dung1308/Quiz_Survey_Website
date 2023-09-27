import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import {Box, Paper, CssBaseline, createTheme, ThemeProvider,Button} from '@mui/material';
import Home from './pages/home';
import Surveys from './pages/surveys';
import About from './pages/about';
import Report from './pages/report';
import Login from './pages/login';
import SignUp from './pages/signup';
import AnswerPage from './pages/answerPage';
import CreateSurvey from './pages/create_survey';
import Category from './pages/category';

const themeLight = createTheme({
  palette: {
    background: {
      default: "#e4f0e2"
    }
  }
});

const themeDark = createTheme({
  palette: {
    background: {
      default: "#222222"
    },
    text: {
      primary: "#ffffff"
    }
  }
});

const App: React.FC = () => {
  const [light, setLight] = React.useState(true);
  return (
    <>
      {/*<script  src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossOrigin="anonymous"/>*/}
            <Routes>
              <Route path = "/" element = {<Home/>} />
              <Route path = "/surveys" element = {<Surveys/>} />
              <Route path = "/report" element = {<Report/>} />
              <Route path = "/about" element = {<About/>} />
              <Route path = "/category" element = {<Category/>} />
              <Route path = "/login" element = {<Login/>} />
              <Route path = "/signup" element = {<SignUp/>} />
              <Route path = "/answer_page/:userId/:surveyId/" element = {<AnswerPage/>} />
              <Route path = "/:userId/create" element = {<CreateSurvey/>} />
              <Route path = "/edit/:surveyId" element = {<CreateSurvey/>} />
            </Routes>
    </>
  );
}

export default App;
