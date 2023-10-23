import React, { useEffect, useState } from "react";
import Layout from "../../components/templates/layout";
import {
  AnswerReport,
  DeleteReportAndAllowRedo,
  GetAnswerReports,
  GetDefaultScores,
  GetDistinctQuestionBankInteractByUser,
  GetDistinctReportsByOwner,
  GetInteractionsByInteractId,
  GetInteractionsByUserAndQuestionBank,
  GetLimitedInteractionsByUserAndQuestionBank,
  GetMultipleReports,
  GetMultipleReportsAscOrDes,
  GetMultipleReportsFilteredAscOrDes,
  GetMultipleReportsForAdmin,
  GetMultipleReportsWithQuestionBankName,
  GetMultipleReportsWithUserName,
  Interaction,
  MultipleReportWithPagination,
  QuestionBank,
  Role,
  UserDTO,
} from "../../services/dataService/dataService";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
} from "@mui/material";
import StyledTableCell from "../../components/molecules/TableCellStyle";
import RowComponent_Report from "../../components/organisms/rowComponentReport";
import RowComponent_Report_Interactions from "../../components/organisms/rowComponent_Report_Interacts";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { styled } from "@mui/material/styles";
import { blue, grey } from "@mui/material/colors";
import RowComponent_Report_Answer from "../../components/organisms/rowComponentReport_Answers";
import StyledTableSortLabel from "../../components/molecules/TableSortStyle";

// function createReport(
//   id: string,
//   questionBankId: string,
//   questionBankName: string
// ) {
//   return {
//     id,
//     questionBankId,
//     questionBankName,
//   };
// }
interface ResultShowDTO {
  id: number;
  onAnswers: string[];
  resultScore: number;
  questionId: number;
  questionBankInteractId: number;
}
// interface ReportDTO {
//   questionBankId: number;
//   surveyName: string;
//   userName: string;
//   resultScores: number;
// }

interface ItemsDTO {
  questionBankId: number;
  userId: number;
  surveyName: string;
  userName: string;
  ownerName: string;
  resultScores: number;
}

const Report: React.FC = () => {
  const newData =
    localStorage.getItem("currentUser") ??
    JSON.stringify(new UserDTO(0, "", "", "", true, 0));
  const newRole =
    localStorage.getItem("Role") ??
    JSON.stringify(new Role(0, "Anonymous", "Anonymous"));

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
  // const [value, setValue] = useState("");
  // const [open, setOpen] = useState(false);

  const handleChangeForAscOrDes = async (filter: string) => {
    setFilterAscOrDes(filter);
    // setPage(0);
    setLoading(true);
    handleMenuClose();
    setFilterAscOrNot(filter === "Asc" ? true : false);
    // if (filterQuestionBankNameValue !== "")
    //   await GetMultipleReportsWithQuestionBankName(
    //     roleData.permission,
    //     userData.id,
    //     rowsPerPage,
    //     page + 1,
    //     // filter
    //     filter,
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
    //     filter,
    //     filterUserNameValue
    //   ).then((data) => {
    //     // setFilterQuestionBankNameValue("");
    //     setQuestionBankInteract(data);
    //     setTotalPages(data.numOfItems);
    //     setLoading(false);
    //   });
    // else
    //   await GetMultipleReportsAscOrDes(
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
    await GetMultipleReportsFilteredAscOrDes(
      userData.id,
      rowsPerPage,
      page + 1,
      // filter
      filter === "Asc" ? true : false,
      filterOwnerValue,
      filterQuestionBankNameValue,
      filterUserNameValue
    ).then((data) => {
      console.log("QuestionBankName: ", data);
      // setFilterUserNameValue("");
      setQuestionBankInteract(data);
      setTotalPages(data.numOfItems);
      setLoading(false);
    });
  };

  const handleChangeForOwner = async (filter: string) => {
    // setFilterAscOrDes(filter);
    setPage(0);
    setLoading(true);
    handleMenuOwnerClose();
    // await GetMultipleReportsWithQuestionBankName(
    //   roleData.permission,
    //   userData.id,
    //   rowsPerPage,
    //   1,
    //   // filter
    //   "Asc",
    //   filter
    // ).then((data) => {
    //   setPage(0);
    //   console.log("QuestionBankName: ", data);
    //   // setFilterUserNameValue("");
    //   setQuestionBankInteract(data);
    //   setTotalPages(data.numOfItems);
    //   setLoading(false);
    // });
    await GetMultipleReportsFilteredAscOrDes(
      userData.id,
      rowsPerPage,
      page + 1,
      // filter
      filterAscOrNot,
      filter,
      filterQuestionBankNameValue,
      filterUserNameValue
    ).then((data) => {
      setPage(0);
      setQuestionBankInteract(data);
      setTotalPages(data.numOfItems);
      setLoading(false);
    });
  };

  const handleChangeForQuestionBankName = async (filter: string) => {
    // setFilterAscOrDes(filter);
    setPage(0);
    setLoading(true);
    handleMenuQuestionBankNameClose();
    // await GetMultipleReportsWithQuestionBankName(
    //   roleData.permission,
    //   userData.id,
    //   rowsPerPage,
    //   1,
    //   // filter
    //   "Asc",
    //   filter
    // ).then((data) => {
    //   setPage(0);
    //   console.log("QuestionBankName: ", data);
    //   // setFilterUserNameValue("");
    //   setQuestionBankInteract(data);
    //   setTotalPages(data.numOfItems);
    //   setLoading(false);
    // });
    await GetMultipleReportsFilteredAscOrDes(
      userData.id,
      rowsPerPage,
      page + 1,
      // filter
      filterAscOrNot,
      filterOwnerValue,
      filter,
      filterUserNameValue
    ).then((data) => {
      setPage(0);
      setQuestionBankInteract(data);
      setTotalPages(data.numOfItems);
      setLoading(false);
    });
  };

  const handleChangeForUserName = async (filter: string) => {
    // setFilterAscOrDes(filter);
    setPage(0);
    setLoading(true);
    handleMenuUserNameClose();
    console.log("User");
    // await GetMultipleReportsWithUserName(
    //   roleData.permission,
    //   userData.id,
    //   rowsPerPage,
    //   1,
    //   // filter
    //   "Asc",
    //   filter
    // ).then((data) => {
    //   setPage(0);
    //   // setFilterQuestionBankNameValue("");
    //   setQuestionBankInteract(data);
    //   setTotalPages(data.numOfItems);
    //   setLoading(false);
    // });
    await GetMultipleReportsFilteredAscOrDes(
      userData.id,
      rowsPerPage,
      page + 1,
      // filter
      filterAscOrNot,
      filterOwnerValue,
      filterQuestionBankNameValue,
      filter
    ).then((data) => {
      setPage(0);
      setQuestionBankInteract(data);
      setTotalPages(data.numOfItems);
      setLoading(false);
    });
  };

  const handleFilterButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorElForAscOrDes(event.currentTarget);
  };

  const handleFilterOwnerButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorElForOwner(event.currentTarget);
  };

  const handleFilterQuestionBankNameButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorElForQuestionBankName(event.currentTarget);
  };

  const handleFilterUserNameButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorElUserName(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElForAscOrDes(null);
  };

  const handleMenuOwnerClose = () => {
    setAnchorElForOwner(null);
  };

  const handleMenuQuestionBankNameClose = () => {
    setAnchorElForQuestionBankName(null);
  };

  const handleMenuUserNameClose = () => {
    setAnchorElUserName(null);
  };

  // const handleFilterButtonClick = () => {
  //   setOpen(true);
  // };

  // const handleSelectClose = () => {
  //   setOpen(false);
  // };

  const [loading, setLoading] = useState(true);
  // const [rows, setRows] = useState<any>([]);
  const [userData, setUserData] = useState<UserDTO>(JSON.parse(newData));
  const [roleData, setRoleData] = useState<Role>(JSON.parse(newRole));
  // const [questionBankInteract, setQuestionBankInteract] = useState<ReportDTO[]>(
  //   []
  // );

  const [anchorElForAscOrDes, setAnchorElForAscOrDes] =
    React.useState<null | HTMLElement>(null);
  const [anchorElForOwner, setAnchorElForOwner] =
    React.useState<null | HTMLElement>(null);
  const [anchorElForQuestionBankName, setAnchorElForQuestionBankName] =
    React.useState<null | HTMLElement>(null);
  const [anchorElUserName, setAnchorElUserName] =
    React.useState<null | HTMLElement>(null);
  const openForAscOrDes = Boolean(anchorElForAscOrDes);
  const handleClickForAscOrDes = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorElForAscOrDes(event.currentTarget);
  };
  const handleCloseForAscOrDes = () => {
    setAnchorElForAscOrDes(null);
  };

  // Filter
  const [filterAscOrDes, setFilterAscOrDes] = useState("Asc");
  const [filterAscOrNot, setFilterAscOrNot] = useState(true);
  const [filterOwnerValue, setFilterOwnerValue] = useState("");
  const [filterQuestionBankNameValue, setFilterQuestionBankNameValue] =
    useState("");
  const [filterUserNameValue, setFilterUserNameValue] = useState("");
  const [filterOwner, setFilterOwner] = useState("");
  const [filterQuestionBankName, setFilterQuestionBankName] = useState("");
  const [filterUserName, setFilterUserName] = useState("");

  const [questionBankInteract, setQuestionBankInteract] =
    useState<MultipleReportWithPagination>(
      new MultipleReportWithPagination({ pages: 0, numOfItems: 0, data: [] })
    );

  // const [similarQuestionBankInteract, setSimilarQuestionBankInteract] =
  //   useState<Interaction[]>([]);
  const [similarQuestionBankInteract, setSimilarQuestionBankInteract] =
    useState<ItemsDTO[]>([
      // {
      //   id: 0,
      //   questionBankId: 0,
      //   userId: 0,
      //   surveyName: "",
      //   userName: "",
      //   ownerName: "",
      //   resultScores: 1,
      // },
    ]);

  const [questionBankNames, setQuestionBankNames] = useState<string[]>([]);
  const [questionBankResults, setQuestionBankResults] = useState<Interaction[]>(
    []
  );
  const [answerResult, setAnswerResult] = useState<ResultShowDTO[]>([]);

  const [resultShowsList, setResultShowsList] = useState<AnswerReport>(
    new AnswerReport({ data: [] })
  );

  const [openQuestionBankResults, setOpenQuestionBankResults] = useState(false);

  const [openanswerResult, setOpenAnswerResult] = useState(false);

  const [totalScore, setTotalScore] = React.useState(0.0);

  const [scoreList, setScoreList] = React.useState(0.0);

  const handleOpenQuestionBankResults = () => {
    setOpenQuestionBankResults(true);
  };

  const handleCloseQuestionBankResults = () => {
    setOpenQuestionBankResults(false);
  };

  const handleOpenAnswerResult = () => {
    setOpenAnswerResult(true);
  };

  const handleCloseAnswerResult = () => {
    setOpenAnswerResult(false);
    setOpenQuestionBankResults(true);
  };

  const getInteractions_ById = async (index: number) => {
    await GetInteractionsByUserAndQuestionBank(userData.id, index).then(
      (data) => {
        setQuestionBankResults(data);
        handleOpenQuestionBankResults();
      }
    );
  };

  const getAnswerResults = (index: number) => {
    setAnswerResult(questionBankResults[index].resultShowDTOs);
    handleOpenAnswerResult();
  };

  const listTitles = [
    ["QuestionBankName", "UserName"],
    ["Id", "Question Bank Id", "Results", "Show Answers Results", "Delete Report And Redo"],
    ["Id", "Question Name", "Result", "Your Answers"],
  ];
  const listSetStateForReport = [
    setFilterQuestionBankNameValue,
    setFilterUserName,
  ];
  // const listStateValueForReport = [filterQuestionBankName, filterUserName];
  const listButtonFunctionsForReport = [
    handleChangeForQuestionBankName,
    handleChangeForUserName,
  ];

  const listContents = [
    {
      id: questionBankInteract.data
        // .reverse()
        .map((data) => data.questionBankId),
    },
  ];

  const listButtonFunctions = [
    {
      closeButtons: [],
      showButtons: [getInteractions_ById, getAnswerResults],
    },
    {
      closeButtons: [handleCloseQuestionBankResults],
      showButtons: [getAnswerResults],
    },
    {
      closeButtons: [handleCloseAnswerResult],
      showButtons: [],
    },
  ];

  // const handleShowSurveyResults = async (
  //   userId: number,
  //   questionBankId: number,
  //   limitNumber = 5
  // ) => {
  //   await GetLimitedInteractionsByUserAndQuestionBank(
  //     userId,
  //     questionBankId,
  //     limitNumber
  //   ).then((data) => {
  //     setSimilarQuestionBankInteract(data);
  //     console.log(data);
  //     handleOpenQuestionBankResults();
  //   });
  // };

  const handleShowSurveyResults = async (
    index: number,
    questionBankId: number
  ) => {
    const similarReports = questionBankInteract.data[index].items;
    console.log(similarReports);
    setSimilarQuestionBankInteract(similarReports);
    if (similarQuestionBankInteract !== undefined) {
      await GetDefaultScores(questionBankId ?? 0).then((data) => {
        console.log("Score", data.totalScore);
        setTotalScore(data.totalScore);
        handleOpenQuestionBankResults();
      });
    }
  };

  const handleResultShow = async (questionBankInteractId: number) => {
    // const selectedSurvey = similarQuestionBankInteract.find(
    //   (x: any) => x.id === questionBankInteractId
    // );
    await GetAnswerReports(questionBankInteractId).then((data) => {
      const resultShows = data;
      console.log("Result", data);
      setResultShowsList(resultShows);
      handleCloseQuestionBankResults();
      handleOpenAnswerResult();
    });

    // if (selectedSurvey !== undefined) {
    //   const resultShows = selectedSurvey

    //   // const resultShows = selectedSurvey.resultShowDTOs ?? resultShowsList;
    //   // setResultShowsList(resultShows);
    // }
    // handleCloseQuestionBankResults();
    // handleOpenAnswerResult();
  };

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(10);

  const handleChangePage = async (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    // setLoading(true);
    setUserData(JSON.parse(newData));
    console.log(userData);

    await GetMultipleReportsFilteredAscOrDes(
      userData.id,
      rowsPerPage,
      newPage + 1,
      // filter
      filterAscOrNot,
      filterOwnerValue,
      filterQuestionBankName,
      filterUserNameValue
    ).then((data) => {
      setQuestionBankInteract(data);
      setTotalPages(data.numOfItems);
      // setLoading(false);
    });
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
    //   await GetMultipleReportsAscOrDes(
    //     roleData.permission,
    //     userData.id,
    //     newRowsPerPage,
    //     page + 1,
    //     filterAscOrDes
    //   ).then((data) => {
    //     setQuestionBankInteract(data);
    //     setLoading(false);
    //   });
    await GetMultipleReportsFilteredAscOrDes(
      userData.id,
      newRowsPerPage,
      page + 1,
      // filter
      filterAscOrNot,
      filterOwnerValue,
      filterQuestionBankName,
      filterUserNameValue
    ).then((data) => {
      setQuestionBankInteract(data);
      setTotalPages(data.numOfItems);
      setLoading(false);
    });
    // setQuestionBankInteract(data);
    // setLoading(false);
    console.log("Error: ", rowsPerPage + 1);
    // }
  };

  useEffect(() => {
    setLoading(true);
    setUserData(JSON.parse(newData));
    console.log(userData);
    // if (roleData.permission === "All") {
    //   GetMultipleReportsForAdmin(userData.id, rowsPerPage, page + 1).then(
    //     (data) => {
    //       const newReportDTO = data;
    //       setQuestionBankInteract(data);
    //       setTotalPages(newReportDTO.numOfItems);
    //       setLoading(false);
    //       console.log("Error: ", data);
    //     }
    //   );
    // } else {
    GetMultipleReportsFilteredAscOrDes(
      userData.id,
      rowsPerPage,
      page + 1,
      filterAscOrNot,
      "",
      "",
      ""
    ).then((data) => {
      const newReportDTO = data;
      setQuestionBankInteract(data);
      setTotalPages(newReportDTO.numOfItems);
      setLoading(false);
      console.log("Error: ", data);
    });
    // }
    // GetDistinctReportsByOwner(userData.id, rowsPerPage, page).then((data) => {
    //   console.log(typeof data.pagedItems);

    //   const newReportDTO = data.pagedItems.reverse();
    //   setQuestionBankInteract(newReportDTO);
    //   // setTimeout(() => {
    //   //   setLoading(false);
    //   // }, 1000)
    //   setLoading(false);
    //   console.log(questionBankInteract);
    // });
    // GetDistinctQuestionBankInteractByUser(userData.id).then((data) => {
    //   setQuestionBankInteract(data.reverse());
    //   // setTimeout(() => {
    //   //   setLoading(false);
    //   // }, 1000)
    //   setLoading(false);
    //   console.log(questionBankInteract);
    // });
  }, []);

  return (
    <>
      <Layout />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Box m={2}>
          <TableContainer
            component={Paper}
            sx={{
              overflow: "auto",
            }}
          >
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    <Box sx={{ flexDirection: "column" }}>
                      <Box
                        sx={{
                          fontSize: { xs: "10px", md: "13px", mr: "18px" },
                        }}
                      >
                        Survey Id
                      </Box>
                      <Button
                        onClick={handleFilterButtonClick}
                        startIcon={
                          <KeyboardArrowDownIcon sx={{ color: "white" }} />
                        }
                        sx={{
                          textAlign: "left",
                          width: "100%",
                          fontSize: { xs: "10px", md: "13px", mr: "18px" },
                          "@media (min-width: 768px)": {
                            width: "50%",
                          },
                          "@media (min-width: 1024px)": {
                            width: "30%",
                          },
                        }}
                      >
                        Asc/Des
                        {filterAscOrNot === null
                          ? ""
                          : filterAscOrNot === true
                          ? " (Asc)"
                          : " (Des)"}
                      </Button>
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
                    </Box>
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    <div style={{ flexDirection: "column" }}>
                      <Box
                        sx={{
                          fontSize: { xs: "10px", md: "13px", mr: "18px" },
                        }}
                      >
                        Owner
                      </Box>
                      <Button
                        onClick={handleFilterOwnerButtonClick}
                        startIcon={
                          <KeyboardArrowDownIcon sx={{ color: "white" }} />
                        }
                        sx={{
                          textAlign: "left",
                          width: "100%",
                          fontSize: { xs: "10px", md: "13px", mr: "18px" },
                          "@media (min-width: 768px)": {
                            width: "50%",
                          },
                          "@media (min-width: 1024px)": {
                            width: "30%",
                          },
                        }}
                      >
                        Filter Owner
                        {filterOwnerValue === ""
                          ? ""
                          : filterOwnerValue.length > 5
                          ? " (" + filterOwnerValue.substring(0, 5) + "...)"
                          : " (" + filterOwnerValue + ")"}
                      </Button>
                      <Menu
                        anchorEl={anchorElForOwner}
                        open={Boolean(anchorElForOwner)}
                        onClose={handleMenuOwnerClose}
                      >
                        <MenuItem>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="ownerName"
                            label="Owner Name"
                            value={filterOwnerValue.toUpperCase()}
                            fullWidth
                            variant="standard"
                            onChange={(e) => {
                              setFilterOwnerValue(e.target.value);
                            }}
                            sx={{
                              width: "100%",
                              "@media (min-width: 768px)": {
                                width: "50%",
                              },
                              "@media (min-width: 1024px)": {
                                width: "30%",
                              },
                            }}
                          />
                          <Button
                            fullWidth
                            onClick={() =>
                              handleChangeForOwner(filterOwnerValue)
                            }
                            sx={{
                              width: "100%",
                              "@media (min-width: 768px)": {
                                width: "50%",
                              },
                              "@media (min-width: 1024px)": {
                                width: "30%",
                              },
                            }}
                          >
                            Filter
                          </Button>
                        </MenuItem>
                      </Menu>
                    </div>
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    <div style={{ flexDirection: "column" }}>
                      <Box
                        sx={{
                          fontSize: { xs: "10px", md: "13px", mr: "18px" },
                        }}
                      >
                        Survey Name
                      </Box>
                      <Button
                        onClick={handleFilterQuestionBankNameButtonClick}
                        startIcon={
                          <KeyboardArrowDownIcon sx={{ color: "white" }} />
                        }
                        sx={{
                          textAlign: "left",
                          fontSize: { xs: "10px", md: "13px", mr: "18px" },
                          width: "100%",
                          "@media (min-width: 768px)": {
                            width: "50%",
                          },
                          "@media (min-width: 1024px)": {
                            width: "30%",
                          },
                        }}
                      >
                        Filter Survey Name
                        {filterQuestionBankNameValue === ""
                          ? ""
                          : filterQuestionBankNameValue.length > 5
                          ? " (" +
                            filterQuestionBankNameValue.substring(0, 5) +
                            "...)"
                          : " (" + filterQuestionBankNameValue + ")"}
                      </Button>
                      <Menu
                        anchorEl={anchorElForQuestionBankName}
                        open={Boolean(anchorElForQuestionBankName)}
                        onClose={handleMenuQuestionBankNameClose}
                      >
                        <MenuItem>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="surveyName"
                            label="Survey Name"
                            value={filterQuestionBankNameValue.toUpperCase()}
                            fullWidth
                            variant="standard"
                            onChange={(e) => {
                              setFilterQuestionBankNameValue(e.target.value);
                            }}
                            sx={{
                              width: "100%",
                              "@media (min-width: 768px)": {
                                width: "50%",
                              },
                              "@media (min-width: 1024px)": {
                                width: "30%",
                              },
                            }}
                          />
                          <Button
                            fullWidth
                            onClick={() =>
                              handleChangeForQuestionBankName(
                                filterQuestionBankNameValue
                              )
                            }
                            sx={{
                              width: "100%",
                              "@media (min-width: 768px)": {
                                width: "50%",
                              },
                              "@media (min-width: 1024px)": {
                                width: "30%",
                              },
                            }}
                          >
                            Filter
                          </Button>
                        </MenuItem>
                      </Menu>
                    </div>

                    {/* <Button
                      onClick={handleFilterQuestionBankNameButtonClick}
                      startIcon={
                        <KeyboardArrowDownIcon sx={{ color: "white" }} />
                      }
                    />
                    <Menu
                      anchorEl={anchorElForQuestionBankName}
                      open={Boolean(anchorElForQuestionBankName)}
                      onClose={handleMenuQuestionBankNameClose}
                    >
                      <MenuItem>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="surveyName"
                          label="Survey Name"
                          value={filterQuestionBankNameValue}
                          fullWidth
                          variant="standard"
                          onChange={(e) => {
                            setFilterQuestionBankNameValue(e.target.value);
                          }}
                        />
                        <Button
                          fullWidth
                          onClick={() =>
                            handleChangeForQuestionBankName(
                              filterQuestionBankNameValue
                            )
                          }
                        >
                          Filter
                        </Button>
                      </MenuItem>
                    </Menu>
                    Survey Name */}
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    <div style={{ flexDirection: "column" }}>
                      <div>Username</div>
                      <Button
                        onClick={handleFilterUserNameButtonClick}
                        startIcon={
                          <KeyboardArrowDownIcon sx={{ color: "white" }} />
                        }
                        sx={{
                          textAlign: "left",
                          width: "100%",
                          "@media (min-width: 768px)": {
                            width: "50%",
                          },
                          "@media (min-width: 1024px)": {
                            width: "30%",
                          },
                        }}
                      >
                        Filter Username
                        {filterUserNameValue === ""
                          ? ""
                          : filterUserNameValue.length > 5
                          ? " (" + filterUserNameValue.substring(0, 5) + "...)"
                          : " (" + filterUserNameValue + ")"}
                      </Button>
                      <Menu
                        anchorEl={anchorElUserName}
                        open={Boolean(anchorElUserName)}
                        onClose={handleMenuUserNameClose}
                      >
                        <MenuItem>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="surveyName"
                            label="Username"
                            value={filterUserNameValue.toUpperCase()}
                            fullWidth
                            variant="standard"
                            onChange={(e) => {
                              setFilterUserNameValue(e.target.value);
                            }}
                            sx={{
                              width: "100%",
                              "@media (min-width: 768px)": {
                                width: "50%",
                              },
                              "@media (min-width: 1024px)": {
                                width: "30%",
                              },
                            }}
                          />
                          <Button
                            fullWidth
                            onClick={() =>
                              handleChangeForUserName(filterUserNameValue)
                            }
                            sx={{
                              width: "100%",
                              "@media (min-width: 768px)": {
                                width: "50%",
                              },
                              "@media (min-width: 1024px)": {
                                width: "30%",
                              },
                            }}
                          >
                            Filter
                          </Button>
                        </MenuItem>
                      </Menu>
                    </div>

                    {/* <Button
                      onClick={handleFilterUserNameButtonClick}
                      startIcon={
                        <KeyboardArrowDownIcon sx={{ color: "white" }} />
                      }
                    />
                    <Menu
                      anchorEl={anchorElUserName}
                      open={Boolean(anchorElUserName)}
                      onClose={handleMenuUserNameClose}
                    >
                      <MenuItem>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="surveyName"
                          label="Username"
                          value={filterUserNameValue}
                          fullWidth
                          variant="standard"
                          onChange={(e) => {
                            setFilterUserNameValue(e.target.value);
                          }}
                        />
                        <Button
                          fullWidth
                          onClick={() =>
                            handleChangeForUserName(filterUserNameValue)
                          }
                        >
                          Filter
                        </Button>
                      </MenuItem>
                    </Menu>
                    Username */}
                  </StyledTableCell>
                  {/* {listTitles[0].map((title: any, index: number) => (
                    <StyledTableCell align="right">
                      {""}
                      {title}
                      <Button
                        onClick={handleFilterQuestionBankNameButtonClick}
                        startIcon={
                          <KeyboardArrowDownIcon sx={{ color: "white" }} />
                        }
                      />
                      <Menu
                        anchorEl={anchorElForQuestionBankName}
                        open={Boolean(anchorElForQuestionBankName)}
                        onClose={handleMenuQuestionBankNameClose}
                      >
                        <MenuItem>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="surveyName"
                            label="Survey Name"
                            fullWidth
                            variant="standard"
                            onChange={(e) => {
                              listSetStateForReport[index](e.target.value);
                            }}
                          />
                          <Button
                            fullWidth
                            onClick={() =>
                              listButtonFunctionsForReport[index](
                                listStateValueForReport[index]
                              )
                            }
                          >
                            Filter
                          </Button>
                        </MenuItem>
                      </Menu>
                    </StyledTableCell>
                  ))} */}

                  {/* Show Interaction Results */}
                  <StyledTableCell align="right">
                    Show Interaction Results
                  </StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {questionBankInteract.data
                  // .reverse()
                  .map((row: any, index: number) => (
                    <RowComponent_Report
                      row={row}
                      index={index}
                      userData={userData}
                      handleShowSurveyResults={handleShowSurveyResults}
                    />
                  ))}
              </TableBody>
              <CustomTablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
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
              />
            </Table>
          </TableContainer>
        </Box>
      )}
      <Dialog
        open={openQuestionBankResults}
        onClose={handleCloseQuestionBankResults}
        maxWidth={false}
      >
        <DialogTitle>Survey Results</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper} sx={{ overflow: "auto" }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  {listTitles[1].map((title: any, index: number) => (
                    <StyledTableCell>
                      {title}
                      {/* <IconButton>
                        <KeyboardArrowDownIcon sx={{ color: "white" }} />
                      </IconButton> */}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {similarQuestionBankInteract.map((row: any, index: number) => (
                  <RowComponent_Report_Interactions
                    row={row}
                    index={index}
                    userData={userData}
                    totalScore={totalScore}
                    handleResultShow={handleResultShow}
                    similarQuestionBankInteract = {similarQuestionBankInteract}
                    setSimilarQuestionBankInteract = {setSimilarQuestionBankInteract}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openanswerResult}
        onClose={handleCloseAnswerResult}
        maxWidth={false}
      >
        <DialogTitle>Questions Results ?</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper} sx={{ overflow: "auto" }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  {listTitles[2].map((title: any, index: number) => (
                    <StyledTableCell>
                      {title}
                      {/* <IconButton>
                        <KeyboardArrowDownIcon sx={{ color: "white" }} />
                      </IconButton> */}
                    </StyledTableCell>
                  ))}
                  <StyledTableCell align="right">Right Answers</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {resultShowsList.data.map((row: any, index: number) => (
                  <RowComponent_Report_Answer
                    row={row}
                    index={index}
                    userData={userData}
                  />
                ))}
                {/* {rows.map((row:any, index:number) => (
                <RowComponent setQuestionBank={setQuestionBank} row={row} index={index} userId = {userId} questionBank = {questionBank} status = {row.enableStatus} userData = {userData} />
              ))} */}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAnswerResult}>
            Back To Survey Results
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Report;
