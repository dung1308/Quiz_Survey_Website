import React, {} from 'react';
import {Box, Button,Table, styled, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import Layout from '../../components/templates/layout';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
function createData(
    id: number,
    name: string,
    owner: string,
    join: number,
  ) {
    return { id, name, owner, join };
  }
  
  const rows = [
    createData(1, 'Muscle', 'PE teacher', 24),
    createData(2, 'Muscle Survey', 'PE teacher', 37),
    createData(3, 'Push-up Survey', 'PE teacher', 24),
    createData(4, 'Squat Survey', 'PE teacher', 67),
    createData(5, 'Warm-up Survey', 'PE teacher', 49),
  ];

function Home() {
    return (
      <>
        <Layout/>
          <Box m={2}>
              <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                      <TableRow>
                      <StyledTableCell>ID</StyledTableCell>
                      <StyledTableCell align="right">Name</StyledTableCell>
                      <StyledTableCell align="right">Owner</StyledTableCell>
                      <StyledTableCell align="center">Join</StyledTableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {rows.map((row) => (
                      <StyledTableRow key={row.id}>
                          <StyledTableCell component="th" scope="row">
                          {row.id}
                          </StyledTableCell>
                          <StyledTableCell align="right">{row.name}</StyledTableCell>
                          <StyledTableCell align="right">{row.owner}</StyledTableCell>
                          <StyledTableCell align="center">
                              <Button variant="contained" color="primary" href='/answer_page'>
                                  Join
                              </Button>
                          </StyledTableCell>
                      </StyledTableRow>
                      ))}
                  </TableBody>
                  </Table>
              </TableContainer>
          </Box>
      </>
    );
  }
export default Home;