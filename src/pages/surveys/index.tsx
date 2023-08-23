import React, {useState, useRef} from 'react';
import {Switch,Box, Button,Table, styled, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import Layout from '../../components/templates/layout';
import StyledTableCell from '../../components/molecules/TableCellStyle';
import RowComponent from '../../components/organisms/rowComponent';


function createData(
    id: number,
    name: string,
    owner: string,
    category: string,
    join: number,
    status: string,
    enableStatus: boolean,
  ) {
    return { id, name, owner, category, join, status, enableStatus };
  }
  const rows = [
    createData(1, 'Muscle', 'PE teacher', 'PE', 0, 'composing', true),
    createData(2, 'Muscle Survey', 'PE teacher', 'Math', 0, 'published', false),
    createData(3, 'Push-up Survey', 'PE teacher', 'Math', 0, 'cancelled', true),
    createData(4, 'Squat Survey', 'PE teacher', 'Math', 0, 'expired', false),
    createData(5, 'Warm-up Survey', 'PE teacher', 'Math', 0, 'expired', true),
  ];

function Surveys() {
    
    return (
        <>
            <Layout/>
            <Box m={2}>
            <Button variant="contained" color="success" href='/create'>
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
                        {rows.map((row) => (
                          <RowComponent row = {row} status = {row.enableStatus}/>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
  }
export default Surveys;