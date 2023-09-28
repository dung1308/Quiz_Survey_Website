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

const RowComponent_Group: React.FC<any> = ({
  row,
  index,
  userData,
}) => {
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

          {/* <Button variant="contained" color="primary" href={`/answer_page/${userId}/${row.id}`} size="small"  */}
          <Button
            disabled={joinDisable}
            variant="contained"
            color="primary"
            onClick={buttonJoinWindowOpen}
            size="small"
            sx={{
              marginLeft: 2,
              backgroundColor: "lightgreen",
              color: "white",
              ":hover": { backgroundColor: "limegreen" },
            }}
          >
            Join
          </Button>

          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={buttonInviteWindowOpen}
            sx={{
              marginLeft: 2,
              backgroundColor: "lightpink",
              color: "#333",
              ":hover": { backgroundColor: "pink" },
            }}
          >
            invite
          </Button>

          
        </Box>
      </StyledTableCell>
      <StyledTableCell align="center">{row.status}</StyledTableCell>
      <Dialog open={open} onClose={buttonInviteWindowClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <Tooltip title={`Survey Code is: ${row.surveyCode}`}>
          <Badge
            badgeContent=""
            sx={{
              width: "10px",
              height: "10px",
              "border-radius": "50%",
            }}
          >
            <IconButton>
              <QuestionMarkIcon />
            </IconButton>
          </Badge>
        </Tooltip>
        <DialogActions>
          <Button onClick={buttonInviteWindowClose}>Cancel</Button>
          <Button onClick={buttonInviteWindowClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </StyledTableRow>
  );
};
export default RowComponent_Group;
