import React, {useState} from 'react';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography} from '@mui/material';
import StyledTableCell from '../../molecules/TableCellStyle';
import StyledTableRow from '../../molecules/StyledTableRow';
import { getSurveyByID, createSurvey1, getSurveys, updatedJSON,  } from '../../../services/dataService/dataService';
import { useNavigate } from 'react-router-dom';



const RowComponent:React.FC<any> = ({row, index, status, userId}) => {
    const navigate = useNavigate();

    const [enabled, setEnabled] = useState<Boolean>(status)
    const [open, setOpen] = useState(false);
    const [openJoin, setOpenJoin] = useState(false);
    const [joinSurveyCode, setJoinSurveyCode] = useState("");
    const [wrongSurveyCode, setWrongSurveyCode] = useState(false);
    const buttonHandler = () => {
        setEnabled(status => !status)
    }

    const buttonJoinWindowOpen = () => {
      setOpenJoin(true)
    }

    const buttonJoinWindowClose = () => {
      setOpenJoin(false)
    }

    const buttonInviteWindowOpen = () => {
      setOpen(true)
      setWrongSurveyCode(false)
    }

    const buttonInviteWindowClose = () => {
      setOpen(false)
      setWrongSurveyCode(false)
    }

    const handleJoin = () => {
      if (joinSurveyCode === row.surveyCode){
        console.log(true);
        navigate(`/answer_page/${userId}/${row.id}`);
      }
      else setWrongSurveyCode(true)
    }
    
    return (
      <StyledTableRow key={row.id}>
      <StyledTableCell component="th" scope="row">
      {row.id}
      </StyledTableCell>
      <StyledTableCell align="right">{row.name}</StyledTableCell>
      <StyledTableCell align="right">{row.owner}</StyledTableCell>
      <StyledTableCell align="right">{row.category}</StyledTableCell>
      <StyledTableCell align="center">
          <Box sx={{justifyContent: 'space-between'}}>
          <Button variant="contained" color="secondary" href={`/edit/${row.id}`} size="small" 
          sx={{marginLeft: 2,
               backgroundColor: 'lightblue',
               color: '#333',
               ':hover': { backgroundColor: 'skyblue' }}}
          >
              edit
          </Button>
          
          
          {/* <Button variant="contained" color="primary" href={`/answer_page/${userId}/${row.id}`} size="small"  */}
          <Button variant="contained" color="primary" onClick={buttonJoinWindowOpen} size="small" 
          sx={{marginLeft: 2,
            backgroundColor: 'lightgreen',
            color: 'white',
            ':hover': { backgroundColor: 'limegreen' }}}
          >
              Join
          </Button>
          
          
          <Button variant="contained" color="success" size="small" onClick={buttonInviteWindowOpen}
          sx={{marginLeft: 2,
            backgroundColor: 'lightpink',
            color: '#333',
            ':hover': { backgroundColor: 'pink' }}}
          > 
              invite
          </Button>
          
          
          <Button  variant="contained" color={enabled? 'warning': 'error'} onClick={buttonHandler} size="small" 
          sx={{marginLeft: 2,
            backgroundColor: enabled ? "#e0e0e0" : "#ccc",
            color: enabled ? "#333" : "#666",
            opacity: enabled ? 1 : 0.5,
            ':hover': { backgroundColor: '#ccc' }}}

          >
          {enabled? "Disabled": 'Enabled'}
          </Button>
          </Box>
          
      </StyledTableCell>
      <StyledTableCell align="center">{row.status}</StyledTableCell>
      <Dialog open={open} onClose={buttonInviteWindowClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={buttonInviteWindowClose}>Cancel</Button>
          <Button onClick={buttonInviteWindowClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openJoin} onClose={buttonJoinWindowClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the survey code
          </DialogContentText>
          {wrongSurveyCode && (
            <Typography variant="caption" color="error">
              Wrong Survey Code. Try Again
            </Typography>
          )}
          <TextField
            autoFocus
            margin="dense"
            id="Code"
            label="Code"
            fullWidth
            variant="standard"
            onChange={(e: any) => {setJoinSurveyCode(e.target.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={buttonJoinWindowClose}>Cancel</Button>
          <Button onClick={handleJoin}>Join</Button>
        </DialogActions>
      </Dialog>
  </StyledTableRow>
  
    )
  }
export default RowComponent;