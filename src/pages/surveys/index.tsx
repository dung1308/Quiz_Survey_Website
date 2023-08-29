import React, {useState, useRef} from 'react';
import {Switch,Box, Button,Table, styled, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import Layout from '../../components/templates/layout';
import StyledTableCell from '../../components/molecules/TableCellStyle';
import RowComponent from '../../components/organisms/rowComponent';
import JSONdata from "../../data/data.json";

function createData(
    id: number,
    name: string,
    owner: string,
    category: string,
    join: number,
    status: string,
    startDate: string,
    endDate: string,
    enableStatus: boolean,

  ) {
    return { id, name, owner, category, join, status, startDate, endDate, enableStatus };
  }
  const rows = [
    createData((+JSONdata[0].surveyId), JSONdata[0].surveyName, 'PE teacher', 'PE', 0, 'composing', '20/1/2022','20/3/2022', true),
    createData((+JSONdata[1].surveyId), 'Muscle Survey', 'PE teacher', 'Math', 0, 'published', '20/1/2022','20/3/2022' ,false),
    createData(3, 'Push-up Survey', 'PE teacher', 'Math', 0, 'cancelled', '20/1/2022','20/3/2022' ,true),
    createData(4, 'Squat Survey', 'PE teacher', 'Math', 0, 'expired', '20/1/2022','20/3/2022' ,false),
    createData(5, 'Warm-up Survey', 'PE teacher', 'Math', 0, 'expired', '20/1/2022','20/3/2022' ,true),
  ];
  const dataset = JSONdata.map((data)=>{

  });

function Surveys() {
    const [newRow, setNewRow] = useState()
    
    return (
        <>
            <Layout/>
            <Box m={2}>
            <Button variant="contained" color="success" href='/create' 
            sx = {{backgroundColor:'lightgreen', color:'white',':hover': { backgroundColor: 'limegreen'} }}>
                                    Create
            </Button>
            </Box>
            <Box m={2}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell align="right">Name</StyledTableCell>
                        <StyledTableCell align="right">Owner</StyledTableCell>
                        <StyledTableCell align="right">Category</StyledTableCell>
                        <StyledTableCell align="center">Actions</StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                          <RowComponent row = {row} index={index} status = {row.enableStatus}/>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
  }
export default Surveys;