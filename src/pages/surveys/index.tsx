import React, { useState, useRef, useEffect } from "react";
import {
  Switch,
  Box,
  Button,
  Table,
  styled,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Layout from "../../components/templates/layout";
import StyledTableCell from "../../components/molecules/TableCellStyle";
import RowComponent from "../../components/organisms/rowComponent";
import JSONdata from "../../data/data.json";
import { GetCategories, GetQuestionBankByUserId, QuestionBank, UserDTO, dataSevice } from "../../services/dataService/dataService";
import {
  getSurveyByID,
  getSurveys,
} from "../../services/dataService/dataService";
import { useNavigate, useNavigation } from "react-router-dom";

function createData(
  id: string,
  name: string,
  owner: string,
  category: string,
  status: string,
  startDate: string,
  endDate: string,
  enableStatus: boolean,
  categoryListId: number,
  surveyCode: string,
) {
  return {
    id,
    name,
    owner,
    category,
    status,
    startDate,
    endDate,
    enableStatus,
    categoryListId,
    surveyCode
  };
}

interface Category {
  id: number;
  categoryName: string;
}
// const rows = [
//   createData((+JSONdata[0].surveyId), JSONdata[0].surveyName, 'PE teacher', 'PE', 0, 'composing', '20/1/2022','20/3/2022', true),
//   createData((+JSONdata[1].surveyId), 'Muscle Survey', 'PE teacher', 'Math', 0, 'published', '20/1/2022','20/3/2022' ,false),
//   createData(3, 'Push-up Survey', 'PE teacher', 'Math', 0, 'cancelled', '20/1/2022','20/3/2022' ,true),
//   createData(4, 'Squat Survey', 'PE teacher', 'Math', 0, 'expired', '20/1/2022','20/3/2022' ,false),
//   createData(5, 'Warm-up Survey', 'PE teacher', 'Math', 0, 'expired', '20/1/2022','20/3/2022' ,true),
// ];

// const rows = getSurvey().map((data) => ({
//   id: +data.surveyId,
//   name: data.surveyName,
//   owner: data.owner,
//   category: data.category,
//   join: 0,
//   status: data.status,
//   startDate: data.startDate,
//   endDate: data.endDate,
//   enableStatus: false,
// }));


function Surveys() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<any>([]);
  const [questionBank, setQuestionBank] = useState<QuestionBank[]>([]);
  const [userId, setUserId] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const newData = localStorage.getItem("currentUser") ?? JSON.stringify(new UserDTO(0, "", "", "", 0));
  const [userData, setUserData] = useState<UserDTO>(JSON.parse(newData));

  const getCategoryNameById = (id: number) => {
    const category = categories.find((entity) => entity.id === id);
    return category ? category.categoryName : '.......';
  };




  useEffect(() => {
    setLoading(true);
    setUserData(JSON.parse(newData));
    console.log(userData)
    GetQuestionBankByUserId(userData.id).then((data) => {
      setQuestionBank(data.reverse());
      setLoading(false);
      console.log(data)
    });
  }, [setUserData]);

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {})
  //   GetCategories().then((data) => {
  //     setCategories(data);
  //     setLoading(false);
  //     console.log(data);
  //   });
  // }, []);


  useEffect(() => {
    setLoading(true);
    if (categories !== undefined)
    {const newRows = questionBank.map((data) =>
      createData(
        data.id.toString(),
        data.surveyName,
        data.owner,
        data.categoryName,
        data.status,
        data.startDate,
        data.endDate,
        data.enableStatus,
        data.categoryListId,
        data.surveyCode
      )
    );
    setRows(newRows)}
    setLoading(false);
  }, [questionBank]);

  const handleCreateSurvey = () => {
    navigate(`/${userData.id}/create`);
  };

  return (
    <>
      <Layout />
      <Box m={2}>
        <Button
          variant="contained"
          color="success"
          onClick={handleCreateSurvey}
          sx={{
            backgroundColor: "lightgreen",
            color: "white",
            ":hover": { backgroundColor: "limegreen" },
          }}
        >
          Create
        </Button>
      </Box>
      <Box m={2}>
      {loading ? (
          <p>Loading...</p>
        ) : (
        <TableContainer component={Paper} sx = {{overflow: 'auto'}}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Owner</StyledTableCell>
                <StyledTableCell align="right">Category</StyledTableCell>
                <StyledTableCell align="right">Expired Date</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row:any, index:number) => (
                <RowComponent setQuestionBank={setQuestionBank} row={row} index={index} userId = {userId} questionBank = {questionBank} status = {row.enableStatus} userData = {userData} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        )}
      </Box>
    </>
  );
}
export default Surveys;
