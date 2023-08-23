import React, {useState} from 'react';
import {Box, Button} from '@mui/material';
import StyledTableCell from '../../molecules/TableCellStyle';
import StyledTableRow from '../../molecules/StyledTableRow';



const RowComponent:React.FC<any> = ({row, status}) => {
    const [enabled, setEnabled] = useState<Boolean>(status)
    const buttonHandler = () => {
        setEnabled(status => !status)
        console.log(enabled)
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
          <Button variant="contained" color="secondary" href='/edit' size="small">
              edit
          </Button>
          
          
          <Button variant="contained" color="primary" href='/answer_page' size="small">
              Join
          </Button>
          
          
          <Button variant="contained" color="success" href='/answer_page' size="small">
              invite
          </Button>
          
          
          <Button  variant="contained" color={enabled? 'warning': 'error'} onClick={buttonHandler} size="small">
          {enabled? "Enabled": 'Disabled'}
          </Button>
          </Box>
          
      </StyledTableCell>
      <StyledTableCell align="center">{row.status}</StyledTableCell>
  </StyledTableRow>
    )
  }
export default RowComponent;