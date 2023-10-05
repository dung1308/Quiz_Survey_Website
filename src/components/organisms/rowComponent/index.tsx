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
  GetQuestionBankByUserId,
  InviteUser,
  InviteUserDTO,
} from "../../../services/dataService/dataService";
import { useNavigate } from "react-router-dom";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import dayjs, { Dayjs } from "dayjs";

const RowComponent: React.FC<any> = ({
  row,
  index,
  status,
  userId,
  questionBank,
  userData,
  setQuestionBank,
}) => {
  const navigate = useNavigate();

  const [enabled, setEnabled] = useState<Boolean>(status);
  const [open, setOpen] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);
  const [inviteUserName, setInviteUserName] = useState("");
  const [joinSurveyCode, setJoinSurveyCode] = useState("");
  const [isBusyAnswer, setIsBusyAnswer] = useState(false);
  const [errorInvite, setErrorInvite] = useState("");

  const [joinDisable, setJoinDisable] = useState(
    row.status === "Early" || row.status === "Expired"
  );
  const [enable_Edit_Disable, setEnable_Edit_Disable] = useState(
    row.status === "Busy"
  );
  const [isOwner, setIsOwner] = useState(
    (row.owner ?? "1") === (userData.userName ?? "1")
  );

  const buttonHandler = async () => {
    // setEnabled((status) => !status);
    // setLoading(true);
    setEnabled((status) => !status);
    await setEnableStatusQuestionBank(row.id, !enabled).then((data) => {
      GetQuestionBankByUserId(userData.id).then((data) => {
        setQuestionBank(data.reverse());
        console.log(data);
      });
      console.log(
        `https://localhost:7232/UpdateEnabledStatus?id=${
          row.id
        }&enableStatus=${!enabled}`
      );
    });
  };

  const buttonJoinWindowOpen = () => {
    setOpenJoin(true);
  };

  const buttonJoinWindowClose = () => {
    setOpenJoin(false);
    setIsBusyAnswer(false);
  };

  const buttonInviteWindowOpen = () => {
    setOpen(true);
    setIsBusyAnswer(false);
  };

  const buttonInviteWindowClose = () => {
    setOpen(false);
    setIsBusyAnswer(false);
  };

  const handleInvite = async () => {
    const newUser = new InviteUserDTO(0, 0, userData.id, row.id);
    await InviteUser(inviteUserName, newUser).then((data) => {

      buttonInviteWindowClose();
    });
  };
  //   InviteUser(new InviteUserDTO(0,0, userData.id, row.id))
  // }

  const handleJoin = async () => {
    // if (joinSurveyCode === row.surveyCode) {
    const busyUserId = localStorage.getItem("busyUser") ?? JSON.stringify(0);
    console.log(busyUserId)
    if ((+busyUserId) === userData.id){
      setIsBusyAnswer(true)
      return
    }
    localStorage.setItem("busyUser", JSON.stringify(userData.id));
    await setStatusAfterJoin(userData.id, row.id).then((data) => {
      if (typeof data === "string" && data !== "") {
        return;
      }
      navigate(`/answer_page/${row.id}`);
    });
    // } else setWrongSurveyCode(true);
  };

  return (
    <StyledTableRow key={row.id}>
      <StyledTableCell component="th" scope="row">
        {row.id}
      </StyledTableCell>
      <StyledTableCell align="right">{row.name}</StyledTableCell>
      <StyledTableCell align="right">{row.owner}</StyledTableCell>
      <StyledTableCell align="right">{row.surveyCode}</StyledTableCell>
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
            disabled={((joinDisable && row.owner !== userData.userName) || !enabled)}
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

          {userData.userName === row.owner && <Button
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
          </Button>}

          {/* <Button
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
          </Button> */}

          <Button
            disabled={enable_Edit_Disable}
            variant="contained"
            color={enabled ? "warning" : "error"}
            onClick={buttonHandler}
            size="small"
            sx={{
              marginLeft: 2,
              backgroundColor: enabled ? "#e0e0e0" : "#ccc",
              color: enabled ? "#333" : "#666",
              opacity: enabled ? 1 : 0.5,
              ":hover": { backgroundColor: "#ccc" },
            }}
          >
            {enabled && !enable_Edit_Disable ? "Disabled" : "Enabled"}
          </Button>
        </Box>
      </StyledTableCell>
      <StyledTableCell align="center">{row.status}</StyledTableCell>
      <Dialog open={open} onClose={buttonInviteWindowClose}>
        <DialogTitle>Invitation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the username you want the person to join your survey
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="userName"
            label="userName"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setInviteUserName(e.target.value);
            }}
          />
        </DialogContent>
        {/* <Tooltip title={`Survey Code is: ${row.surveyCode}`}>
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
        </Tooltip> */}
        <DialogActions>
          <Button onClick={buttonInviteWindowClose}>Cancel</Button>
          <Button onClick={handleInvite}>Invite</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openJoin} onClose={buttonJoinWindowClose}>
        <DialogTitle>Join Survey ?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to answer this survey
          </DialogContentText>
          {isBusyAnswer && (
            <Typography variant="caption" color="error">
              You are busy answering a survey. Complete your survey first before joining
            </Typography>
          )}
          {/* <TextField
            autoFocus
            margin="dense"
            id="Code"
            label="Code"
            fullWidth
            variant="standard"
            onChange={(e: any) => {
              setJoinSurveyCode(e.target.value);
            }}
          /> */}
        </DialogContent>

        <DialogActions>
          <Button onClick={buttonJoinWindowClose}>Cancel</Button>
          <Button onClick={handleJoin}>Join</Button>
        </DialogActions>
      </Dialog>
    </StyledTableRow>
  );
};
export default RowComponent;
