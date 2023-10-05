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

const RowComponent_Group: React.FC<any> = ({ row, index, userData }) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);
  const [joinSurveyCode, setJoinSurveyCode] = useState("");
  const [wrongSurveyCode, setWrongSurveyCode] = useState(false);
  const [joinDisable, setJoinDisable] = useState(
    row.status === "Early" || row.status === "Expired"
  );
  const [enable_Edit_Disable, setEnable_Edit_Disable] = useState(
    row.status === "Busy"
  );
  const [isOwner, setIsOwner] = useState(
    (row.owner ?? "1") === (userData.userName ?? "1")
  );

  const buttonJoinWindowOpen = () => {
    setOpenJoin(true);
  };

  const buttonJoinWindowClose = () => {
    setOpenJoin(false);
  };

  const buttonInviteWindowOpen = () => {
    setOpen(true);
    setWrongSurveyCode(false);
  };

  const buttonInviteWindowClose = () => {
    setOpen(false);
    setWrongSurveyCode(false);
  };

  return (
    <StyledTableRow key={row.id}>
      <StyledTableCell component="th" scope="row">
        {row.id}
      </StyledTableCell>
      {row.length > 1 && (
        row[0].shift().map((content: any, index: number) => (
          <StyledTableCell align="right">{content}</StyledTableCell>
        ))
      )}
      {/* {row[0].map((content: any, index: number) => (
        <StyledTableCell align="right">{row.name}</StyledTableCell>
      ))} */}
      <StyledTableCell align="right">{row.name}</StyledTableCell>
      <StyledTableCell align="right">{row.owner}</StyledTableCell>
      <StyledTableCell align="right">{row.category}</StyledTableCell>
      <StyledTableCell align="right">
        {dayjs(row.endDate, "MM-DD-YYYY HH:mm").format("MM-DD-YYYY")}
      </StyledTableCell>
      <StyledTableCell align="center">
        <Box sx={{ justifyContent: "space-between" }}>
          <Button
            disabled={enable_Edit_Disable || !isOwner}
            variant="contained"
            color="secondary"
            href={`/edit/${row.id}`}
            size="small"
            sx={{
              marginLeft: 2,
              backgroundColor: "lightblue",
              color: "#333",
              ":hover": { backgroundColor: "skyblue" },
            }}
          >
            edit
          </Button>
        </Box>
      </StyledTableCell>
      <StyledTableCell align="center">{row.status}</StyledTableCell>
    </StyledTableRow>
  );
};
export default RowComponent_Group;
