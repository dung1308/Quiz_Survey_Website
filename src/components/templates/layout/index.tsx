import React, {} from 'react';
import {Box, Paper, CssBaseline, createTheme, ThemeProvider,Button} from '@mui/material';
import AppBarSignIn from '../../organisms/NavBar';

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
const Layout: React.FC  = () =>  {
    const [light, setLight] = React.useState(true);
    return(
        <>
        {/*<script  src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossOrigin="anonymous"/>*/}
            <ThemeProvider theme={themeLight}>
            <CssBaseline />
                <AppBarSignIn/>
            </ThemeProvider>
    </>
    );
}

export default Layout;