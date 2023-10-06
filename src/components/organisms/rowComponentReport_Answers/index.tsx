import React, { useState } from "react";
import {
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import StyledTableCell from "../../molecules/TableCellStyle";
import StyledTableRow from "../../molecules/StyledTableRow";
import {
  getSurveyByID,
  createSurvey1,
  getSurveys,
  updatedJSON,
  setStatusAfterJoin,
  setEnableStatusQuestionBank,
} from "../../../services/dataService/dataService";
import { useNavigate } from "react-router-dom";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import dayjs, { Dayjs } from "dayjs";

const RowComponent_Report_Answer: React.FC<any> = ({
  row,
  index,
  userData,
}) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);

  // const buttonShowSurveys = () => {
  //   // handleShowSurveyResults(userData.id, row.questionBankId, 5)
  //   handleShowSurveyResults(index, row.questionBankId)
  // }

  return (
    <StyledTableRow key={row.id}>
      <StyledTableCell
        component="th"
        scope="row"
        style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
      >
        {row.id}
      </StyledTableCell>
      <StyledTableCell component="th" scope="row" align="left">
        {row.questionName}
      </StyledTableCell>
      <StyledTableCell component="th" scope="row" align="right">
        {row.result ?? 0}
      </StyledTableCell>
      <StyledTableCell component="th" scope="row" align="right">
        {row.onAnswers.length > 0 ? row.onAnswers.join(", ") : "No Answer"}
      </StyledTableCell>
      <StyledTableCell component="th" scope="row" align="right">
        {row.rightAnswers.length > 0
          ? row.rightAnswers.join(", ")
          : "No Answer"}
      </StyledTableCell>
      {/* <StyledTableCell align="right">
        <Box sx={{ justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            sx={{
              marginLeft: 2,
              backgroundColor: "lightblue",
              color: "#333",
              ":hover": { backgroundColor: "skyblue" },
            }}
            onClick={buttonShowSurveys}
          >
            Show Survey Results
          </Button>
        </Box>
      </StyledTableCell> */}
      {/* <StyledTableCell align="center">{row.status}</StyledTableCell> */}
    </StyledTableRow>
  );
};
export default RowComponent_Report_Answer;
