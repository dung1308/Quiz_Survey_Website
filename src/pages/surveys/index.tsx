import React, {
  useState,
  // useRef,
  useEffect,
} from "react";
import {
  // Switch,
  Box,
  Button,
  Table,
  styled,
  TableBody,
  // TableCell,
  // tableCellClasses,
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
  MenuItem,
  Menu,
} from "@mui/material";
import Layout from "../../components/templates/layout";
import StyledTableCell from "../../components/molecules/TableCellStyle";
import RowComponent from "../../components/organisms/rowComponent";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
// import JSONdata from "../../data/data.json";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  GetAllQuestionBanks,
  GetAndSetParticipantForSurvey,
  // GetCategories,
  // GetQuestionBankByUserId,
  GetQuestionBankByUserIdAscOrDes,
  QuestionBank,
  Role,
  UserDTO,
  // dataSevice,
  // setStatusAfterJoin,
} from "../../services/dataService/dataService";
import // getSurveyByID,
// getSurveys,
"../../services/dataService/dataService";
import {
  useNavigate,
  // useNavigation
} from "react-router-dom";
import { blue, grey } from "@mui/material/colors";

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
  // const [allQuestionBank, setAllQuestionBank] = useState<QuestionBank[]>([]);
  const [, setAllQuestionBank] = useState<QuestionBank[]>([]);
  const [surveyCodeJoin, setSurveyCodeJoin] = useState("");
  // const [userId, setUserId] = useState(1);
  const [userId] = useState(1);
  // const [categories, setCategories] = useState<Category[]>([]);
  const [categories] = useState<Category[]>([]);
  const newData =
    localStorage.getItem("currentUser") ??
    JSON.stringify(
      new UserDTO(
        0,
        "Anonymous",
        "Anonymous",
        "Anonymous@Anonymous.com",
        true,
        0
      )
    );
  const newRole =
    localStorage.getItem("Role") ??
    JSON.stringify(new Role(0, "Anonymous", "Anonymous"));
  const [userData, setUserData] = useState<UserDTO>(JSON.parse(newData));
  // const [roleData, setRoleData] = useState<Role>(JSON.parse(newRole));
  const [roleData] = useState<Role>(JSON.parse(newRole));

  const [wrongSurveyCode, setWrongSurveyCode] = useState(false);
  const [alreadyParticipated, setAlreadyParticipated] = useState(false);
  const [isDoneAnswer, setIsDoneAnswer] = useState(false);

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(10);
  const [filterAscOrDes, setFilterAscOrDes] = useState("Asc");
  const [anchorElForAscOrDes, setAnchorElForAscOrDes] =
    React.useState<null | HTMLElement>(null);

  const handleFilterButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorElForAscOrDes(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElForAscOrDes(null);
  };

  const handleChangeForAscOrDes = async (filter: string) => {
    setFilterAscOrDes(filter);
    // setPage(0);
    setLoading(true);
    handleMenuClose();
    await GetQuestionBankByUserIdAscOrDes(
      userData.id,
      rowsPerPage,
      page + 1,
      filter
    ).then((data) => {
      setQuestionBank(data.data);
      setTotalPages(data.numOfItems);
      setLoading(false);
      console.log(data);
    });
    // await GetMultipleReportsAscOrDes(
    //     roleData.permission,
    //     userData.id,
    //     rowsPerPage,
    //     page + 1,
    //     filter
    //   ).then((data) => {
    //     setQuestionBankInteract(data);
    //     setTotalPages(data.numOfItems);
    //     setLoading(false);
    //   });
  };

  // Open State
  const [openJoinParticipant, setOpenJoinParticipant] = useState(false);

  const CustomTablePagination = styled(TablePagination)(
    ({ theme }) => `
    & .${classes.spacer} {
      display: none;
    }
  
    & .${classes.toolbar}  {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      color: green;
      gap: 10px;
  
      @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
      }
    }
  
    & .${classes.selectLabel} {
      margin: 0;
      color: green;
    }
  
    & .${classes.select}{
      padding: 2px;
      border: 1px solid ${
        theme.palette.mode === "dark" ? grey[800] : grey[200]
      };
      color: red;
      border-radius: 50px;
      background-color: transparent;
  
      &:hover {
        background-color: ${
          theme.palette.mode === "dark" ? grey[800] : grey[50]
        };
      }
  
      &:focus {
        outline: 1px solid ${
          theme.palette.mode === "dark" ? blue[400] : blue[200]
        };
      }
    }
  
    & .${classes.displayedRows} {
      margin: 0;
  
      @media (min-width: 768px) {
        margin-left: auto;
      }
    }
  
    & .${classes.actions} {
      padding: 2px;
      border: 1px solid ${
        theme.palette.mode === "dark" ? grey[800] : grey[200]
      };
      border-radius: 50px;
      text-align: center;
    }
  
    & .${classes.actions} > button {
      margin: 0 8px;
      border: transparent;
      border-radius: 2px;
      background-color: transparent;
  
      &:hover {
        background-color: ${
          theme.palette.mode === "dark" ? grey[800] : grey[50]
        };
      }
  
      &:focus {
        outline: 1px solid ${
          theme.palette.mode === "dark" ? blue[400] : blue[200]
        };
      }
    }
    `
  );

  // const getCategoryNameById = (id: number) => {
  //   const category = categories.find((entity) => entity.id === id);
  //   return category ? category.categoryName : ".......";
  // };

  const handleChangePage = async (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    setLoading(true);
    // setUserData(JSON.parse(newData));
    // console.log(userData);
    // if (roleData.permission === "All") {
    //   const data = await GetMultipleReportsForAdmin(
    //     userData.id,
    //     rowsPerPage,
    //     newPage + 1
    //   );
    //   // const newReportDTO = data;
    //   setQuestionBankInteract(data);
    //   setLoading(false);
    //   console.log("Change Page: ", data);
    // } else {
    // if (filterQuestionBankNameValue !== "")
    //   await GetMultipleReportsWithQuestionBankName(
    //     roleData.permission,
    //     userData.id,
    //     rowsPerPage,
    //     page + 1,
    //     // filter
    //     filterAscOrDes,
    //     filterQuestionBankNameValue
    //   ).then((data) => {
    //     console.log("QuestionBankName: ", data);
    //     // setFilterUserNameValue("");
    //     setQuestionBankInteract(data);
    //     setTotalPages(data.numOfItems);
    //     setLoading(false);
    //   });
    // else if (filterUserNameValue !== "")
    //   await GetMultipleReportsWithUserName(
    //     roleData.permission,
    //     userData.id,
    //     rowsPerPage,
    //     page + 1,
    //     // filter
    //     filterAscOrDes,
    //     filterUserNameValue
    //   ).then((data) => {
    //     // setFilterQuestionBankNameValue("");
    //     setQuestionBankInteract(data);
    //     setTotalPages(data.numOfItems);
    //     setLoading(false);
    //   });
    // else
    await GetQuestionBankByUserIdAscOrDes(
      userData.id,
      rowsPerPage,
      newPage + 1,
      filterAscOrDes
    ).then((data) => {
      console.log("Error: ", data);
      setQuestionBank(data.data);
      setTotalPages(data.numOfItems);
      if (categories !== undefined) {
        const newRows = data.data.map((data) =>
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
        setLoading(false);
      }
      // setLoading(false);
    });
    // const newReportDTO = data;
    // setQuestionBankInteract(data);
    // setLoading(false);
    // console.log("Error: ", data);
    // }
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log("event.target.value", parseInt(event.target.value, 10));
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    console.log("rowsPerPage: ", rowsPerPage);
    setPage(0);
    setLoading(true);
    // if (roleData.permission === "All") {
    // const data = await GetMultipleReportsForAdmin(
    //   userData.id,
    //   rowsPerPage,
    //   page + 1
    // );
    // setQuestionBankInteract(data);
    // setLoading(false);
    // console.log("Error: ", rowsPerPage + 1);
    // } else {
    // if (filterQuestionBankNameValue !== "")
    //   await GetMultipleReportsWithQuestionBankName(
    //     roleData.permission,
    //     userData.id,
    //     newRowsPerPage,
    //     page + 1,
    //     // filter
    //     filterAscOrDes,
    //     filterQuestionBankNameValue
    //   ).then((data) => {
    //     console.log("QuestionBankName: ", data);
    //     // setFilterUserNameValue("");
    //     setQuestionBankInteract(data);
    //     setTotalPages(data.numOfItems);
    //     setLoading(false);
    //   });
    // else if (filterUserNameValue !== "")
    //   await GetMultipleReportsWithUserName(
    //     roleData.permission,
    //     userData.id,
    //     newRowsPerPage,
    //     page + 1,
    //     // filter
    //     filterAscOrDes,
    //     filterUserNameValue
    //   ).then((data) => {
    //     // setFilterQuestionBankNameValue("");
    //     setQuestionBankInteract(data);
    //     setTotalPages(data.numOfItems);
    //     setLoading(false);
    //   });
    // else
    await GetQuestionBankByUserIdAscOrDes(
      userData.id,
      newRowsPerPage,
      page + 1,
      filterAscOrDes
    ).then((data) => {
      setQuestionBank(data.data);
      setTotalPages(data.numOfItems);
      if (categories !== undefined) {
        const newRows = data.data.map((data) =>
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
        setLoading(false);
      }
    });
    // setQuestionBankInteract(data);
    // setLoading(false);
    console.log("Error: ", rowsPerPage + 1);
    // }
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
    await GetAndSetParticipantForSurvey(userData.id, surveyId).then((data) => {
      if (typeof data === "string" && data !== "") {
        return;
      }
      console.log("This is: ", userData);
      console.log(userData);
      if (data.participantIdList.includes(userData.id))
        setAlreadyParticipated(true);
      else if (data.userDoneIdList.includes(userData.id)) setIsDoneAnswer(true);
      else navigate(`/answer_page/${surveyId}`);
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
    GetQuestionBankByUserIdAscOrDes(userData.id, 5, 1, filterAscOrDes).then(
      (data) => {
        setQuestionBank(data.data);
        setTotalPages(data.numOfItems);
        setLoading(false);
        console.log(data);
      }
    );
  }, [setUserData]);

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
                      <StyledTableCell>
                        <Button
                          onClick={handleFilterButtonClick}
                          startIcon={
                            <KeyboardArrowDownIcon sx={{ color: "white" }} />
                          }
                        />
                        <Menu
                          anchorEl={anchorElForAscOrDes}
                          open={Boolean(anchorElForAscOrDes)}
                          onClose={handleMenuClose}
                        >
                          <MenuItem
                            value="Asc"
                            onClick={(e) => handleChangeForAscOrDes("Asc")}
                          >
                            Ascending
                          </MenuItem>
                          <MenuItem
                            value="Des"
                            onClick={(e) => handleChangeForAscOrDes("Des")}
                          >
                            Descending
                          </MenuItem>
                        </Menu>
                        ID
                      </StyledTableCell>
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
                        rowsPerPage={rowsPerPage}
                        page={page}
                        setLoading={setLoading}
                      />
                    ))}
                  </TableBody>
                  <CustomTablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={3}
                    // component="div"
                    count={totalPages}
                    slotProps={{
                      select: {
                        "aria-label": "rows per page",
                      },
                      actions: {
                        showFirstButton: true,
                        showLastButton: true,
                      },
                    }}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    filterAscOrDes={filterAscOrDes}
                  />
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
          {alreadyParticipated && (
            <Typography variant="caption" color="error">
              You already particpated this survey
            </Typography>
          )}

          {isDoneAnswer && (
            <Typography variant="caption" color="error">
              You have answered this survey. Contact the mananger of this survey
              to redo it.
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
