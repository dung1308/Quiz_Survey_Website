import React, { useState } from "react";
import {
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
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../../components/templates/layout";
import {
  GetAllQuestionBanks,
  QuestionBank,
  Role,
  UserDTO,
  setStatusAfterJoin,
} from "../../services/dataService/dataService";
import { useNavigate } from "react-router-dom";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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
function Home() {
  const [surveyCodeJoin, setSurveyCodeJoin] = useState("");
  const [allQuestionBank, setAllQuestionBank] = useState<QuestionBank[]>([]);
  const [wrongSurveyCode, setWrongSurveyCode] = useState(false);
  const newData =
    localStorage.getItem("currentUser") ??
    JSON.stringify(
      new UserDTO(0, "Anonymous", "Anonymous", "Anonymous@Anonymous.com", 0)
    );
  const newRole =
    localStorage.getItem("Role") ??
    JSON.stringify(new Role(0, "Anonymous", "Anonymous"));
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserDTO>(JSON.parse(newData));
  const [roleData, setRoleData] = useState<Role>(JSON.parse(newRole));
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
  return (
    <>
      <Layout />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            p: 4,
            backgroundColor: "#ffffff",
            borderRadius: 4,
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            maxWidth: 600,
            width: "100%",
          }}
        >
          <Box sx={{ fontSize: 24, fontWeight: "bold", mb: 2 }}>
            ENTER THE SURVEY CODE
          </Box>
          {wrongSurveyCode && (
            <Typography variant="caption" color="error">
              Wrong Survey Code. Try Again
            </Typography>
          )}
          <TextField
            label="ENTER THE SURVEY CODE"
            variant="outlined"
            onChange={(e) => {
              setSurveyCodeJoin(e.target.value);
            }}
            sx={{ mr: 2, width: "100%" }}
          />
          <Button variant="contained" onClick={handleParticipantJoin}>Join</Button>
        </Box>
      </Box>
    </>
  );
}
export default Home;
