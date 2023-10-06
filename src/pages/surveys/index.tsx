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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Typography,
} from "@mui/material";
import Layout from "../../components/templates/layout";
import StyledTableCell from "../../components/molecules/TableCellStyle";
import RowComponent from "../../components/organisms/rowComponent";
import JSONdata from "../../data/data.json";
import {
  GetAllQuestionBanks,
  GetCategories,
  GetQuestionBankByUserId,
  QuestionBank,
  Role,
  UserDTO,
  dataSevice,
  setStatusAfterJoin,
} from "../../services/dataService/dataService";
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
  surveyCode: string
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
    surveyCode,
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

function isQuestionBankArray(data: any): data is QuestionBank[] {
  if (!Array.isArray(data)) {
    return false;
  }

  for (const item of data) {
    if (
      typeof item !== "object" ||
      item === null ||
      !("id" in item) ||
      !("surveyCode" in item)
    ) {
      return false;
    }
  }

  return true;
}

function Surveys() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<any>([]);
  const [questionBank, setQuestionBank] = useState<QuestionBank[]>([]);
  const [allQuestionBank, setAllQuestionBank] = useState<QuestionBank[]>([]);
  const [surveyCodeJoin, setSurveyCodeJoin] = useState("");
  const [userId, setUserId] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const newData =
    localStorage.getItem("currentUser") ??
    JSON.stringify(
      new UserDTO(0, "Anonymous", "Anonymous", "Anonymous@Anonymous.com", 0)
    );
  const newRole =
    localStorage.getItem("Role") ??
    JSON.stringify(new Role(0, "Anonymous", "Anonymous"));
  const [userData, setUserData] = useState<UserDTO>(JSON.parse(newData));
  const [roleData, setRoleData] = useState<Role>(JSON.parse(newRole));

  const [wrongSurveyCode, setWrongSurveyCode] = useState(false);

  // Open State
  const [openJoinParticipant, setOpenJoinParticipant] = useState(false);

  const getCategoryNameById = (id: number) => {
    const category = categories.find((entity) => entity.id === id);
    return category ? category.categoryName : ".......";
  };

  const buttonCloseJoinParticipant = () => {
    setOpenJoinParticipant(false);
    setWrongSurveyCode(false);
  };

  const buttonOpenJoinParticipant = () => {
    setOpenJoinParticipant(true);
    setWrongSurveyCode(false);
  };

  const handleJoin = async (surveyId: number) => {
    await setStatusAfterJoin(userData.id, surveyId).then((data) => {
      if (typeof data === "string" && data !== "") {
        return;
      }
      console.log("This is: ", userData);
      console.log(userData);
      navigate(`/answer_page/${surveyId}`);
    });
  };

  const handleParticipantJoin = async () => {
    await GetAllQuestionBanks().then((data) => {
      console.log(isQuestionBankArray(data));

      if (isQuestionBankArray(data)) {
        setAllQuestionBank(data);
        console.log(data);
        const currentSurvey = data.find(
          (qb) => qb.surveyCode === surveyCodeJoin
        );
        if (currentSurvey !== undefined) {
          handleJoin(currentSurvey.id);
        } else setWrongSurveyCode(true);
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    setUserData(JSON.parse(newData));
    console.log(userData);
    GetQuestionBankByUserId(userData.id).then((data) => {
      setQuestionBank(data.reverse());
      setLoading(false);
      console.log(data);
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
    if (categories !== undefined) {
      const newRows = questionBank.map((data) =>
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
      setRows(newRows);
    }
    setLoading(false);
  }, [questionBank]);

  const handleCreateSurvey = () => {
    navigate(`/create`);
  };

  return (
    <>
      <Layout />
      <Box m={2}>
        {roleData.permission === "All" ? (
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
        ) : (
          <>
            {localStorage.getItem("currentUser") !== null && (
              <Button
                variant="contained"
                color="secondary"
                onClick={buttonOpenJoinParticipant}
                sx={{
                  backgroundColor: "lightblue",
                  color: "#333",
                  ":hover": { backgroundColor: "skyblue" },
                }}
              >
                Join
              </Button>
            )}
          </>
        )}

        {/* <Button
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
        </Button> */}
      </Box>
      <Box m={2}>
        {loading && localStorage.getItem("currentUser") === null ? (
          <p>Loading...</p>
        ) : (
          <>
            {localStorage.getItem("currentUser") !== null && (
              <TableContainer component={Paper} sx={{ overflow: "auto" }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>ID</StyledTableCell>
                      <StyledTableCell align="right">Name</StyledTableCell>
                      <StyledTableCell align="right">Owner</StyledTableCell>
                      <StyledTableCell align="right">
                        Survey Code
                      </StyledTableCell>
                      <StyledTableCell align="right">Category</StyledTableCell>
                      <StyledTableCell align="right">
                        Expired Date
                      </StyledTableCell>
                      <StyledTableCell align="center">Actions</StyledTableCell>
                      <StyledTableCell align="center">Status</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row: any, index: number) => (
                      <RowComponent
                        setQuestionBank={setQuestionBank}
                        row={row}
                        index={index}
                        userId={userId}
                        questionBank={questionBank}
                        status={row.enableStatus}
                        userData={userData}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        )}
      </Box>
      <Dialog open={openJoinParticipant} onClose={buttonCloseJoinParticipant}>
        <DialogTitle>Join ?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the survey code you want to join
          </DialogContentText>
          {wrongSurveyCode && (
            <Typography variant="caption" color="error">
              Wrong Survey Code. Try Again
            </Typography>
          )}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Survey Code"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setSurveyCodeJoin(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={buttonCloseJoinParticipant}>Cancel</Button>
          <Button onClick={handleParticipantJoin}>Join</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default Surveys;
