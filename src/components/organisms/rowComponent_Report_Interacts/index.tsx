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

const RowComponent_Report_Interactions: React.FC<any> = ({
  row,
  index,
  userData,
  totalScore,
  handleResultShow,
}) => {
  const navigate = useNavigate();

  return (
    <StyledTableRow key={row.id}>
      <StyledTableCell component="th" scope="row">
        {row.id}
      </StyledTableCell>
      <StyledTableCell component="th" scope="row" align="left">
        {row.questionBankId}
      </StyledTableCell>
      <StyledTableCell component="th" scope="row" align="left">
        {/* {row.resultScores}/{totalScore ?? 0} */}
        {row.resultScores}/{totalScore === null || totalScore === 0 ? 0 : 10}
      </StyledTableCell>
      <StyledTableCell component="th" scope="row" align="left">
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
            onClick={(e) => {
              handleResultShow(row.id);
            }}
          >
            Show Question Results
          </Button>
        </Box>
      </StyledTableCell>
    </StyledTableRow>
  );
};
export default RowComponent_Report_Interactions;
