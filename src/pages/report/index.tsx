import React, { useEffect, useState } from "react";
import Layout from "../../components/templates/layout";
import {
  GetDefaultScores,
  GetDistinctQuestionBankInteractByUser,
  GetDistinctReportsByOwner,
  GetInteractionsByUserAndQuestionBank,
  GetLimitedInteractionsByUserAndQuestionBank,
  GetMultipleReports,
  GetMultipleReportsForAdmin,
  Interaction,
  MultipleReportWithPagination,
  QuestionBank,
  Role,
  UserDTO,
} from "../../services/dataService/dataService";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import StyledTableCell from "../../components/molecules/TableCellStyle";
import RowComponent_Report from "../../components/organisms/rowComponentReport";
import RowComponent_Report_Interactions from "../../components/organisms/rowComponent_Report_Interacts";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import { styled } from "@mui/material/styles";
import { blue, grey } from "@mui/material/colors";

function createReport(
  id: string,
  questionBankId: string,
  questionBankName: string
) {
  return {
    id,
    questionBankId,
    questionBankName,
  };
}
interface ResultShowDTO {
  id: number;
  onAnswers: string[];
  resultScore: number;
  questionId: number;
  questionBankInteractId: number;
}
interface ReportDTO {
  questionBankId: number;
  surveyName: string;
  userName: string;
  resultScores: number;
}

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
    JSON.stringify(new UserDTO(0, "", "", "", 0));
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
      gap: 10px;
  
      @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
      }
    }
  
    & .${classes.selectLabel} {
      margin: 0;
    }
  
    & .${classes.select}{
      padding: 2px;
      border: 1px solid ${
        theme.palette.mode === "dark" ? grey[800] : grey[200]
      };
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
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<any>([]);
  const [userData, setUserData] = useState<UserDTO>(JSON.parse(newData));
  const [roleData, setRoleData] = useState<Role>(JSON.parse(newRole));
  // const [questionBankInteract, setQuestionBankInteract] = useState<ReportDTO[]>(
  //   []
  // );
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

  const [resultShowsList, setResultShowsList] = useState<ResultShowDTO[]>([]);

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
    ["QuestionBankName", "UserName", "Show Interaction Results"],
    ["Id", "Question Bank Id", "Results", "Show Answers Results"],
    ["Id", "Question Name", "Result", "Your Answers", "Right Answers"],
  ];

  const listContents = [
    {
      id: questionBankInteract.data
        .reverse()
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

  const handleShowSurveyResults = async (index: number, questionBankId: number) => {
    const similarReports = questionBankInteract.data[index].items;
    console.log(similarReports);
    setSimilarQuestionBankInteract(similarReports);
    if (similarQuestionBankInteract !== undefined) {
      await GetDefaultScores(questionBankId ?? 0).then((data) =>{

        console.log("Score", data.totalScore)
        setTotalScore((data.totalScore))
        handleOpenQuestionBankResults();
      });
    }
  };

  const handleResultShow = async (questionBankInteractId: number) => {
    const selectedSurvey = similarQuestionBankInteract.find(
      (x: any) => x.id === questionBankInteractId
    );
    if (selectedSurvey !== undefined) {
      // const resultShows = selectedSurvey.resultShowDTOs ?? resultShowsList;
      // setResultShowsList(resultShows);
    }
    handleCloseQuestionBankResults();
    handleOpenAnswerResult();
  };

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(10);

  // useEffect(() => {
  //   // Fetch data and calculate total pages
  //   const data = fetchData();
  //   const totalPages = Math.ceil(data.length / rowsPerPage);
  //   setTotalPages(totalPages);
  // }, [rowsPerPage]);

  const handleChangePage = async (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    setLoading(true);
    setUserData(JSON.parse(newData));
    console.log(userData);
    // if (roleData.permission === "All") {
    //   const data = await GetMultipleReportsForAdmin(
    //     userData.id,
    //     rowsPerPage,
    //     newPage + 1
    //   );
    //   // const newReportDTO = data;
    //   setQuestionBankInteract(data);
    //   setLoading(false);
    //   console.log("Error: ", data);
    // } else {
    const data = await GetMultipleReports(
      roleData.permission,
      userData.id,
      rowsPerPage,
      newPage + 1
    ).then((data) => {
      setQuestionBankInteract(data);
      setLoading(false);
    });
    // const newReportDTO = data;
    // setQuestionBankInteract(data);
    // setLoading(false);
    console.log("Error: ", data);
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
    const data = await GetMultipleReports(
      roleData.permission,
      userData.id,
      newRowsPerPage,
      page + 1
    ).then((data) => {
      setQuestionBankInteract(data);
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
    GetMultipleReports(
      roleData.permission,
      userData.id,
      rowsPerPage,
      page + 1
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
      {/* <Layout /> */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Box m={2}>
          <TableContainer component={Paper} sx={{ overflow: "auto" }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>QuestionBankId</StyledTableCell>
                  {listTitles[0].map((title: any, index: number) => (
                    <StyledTableCell align="right">{title}</StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {questionBankInteract.data
                  .reverse()
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
      >
        <DialogTitle>Survey Results</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper} sx={{ overflow: "auto" }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  {listTitles[1].map((title: any, index: number) => (
                    <StyledTableCell>{title}</StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {similarQuestionBankInteract.map((row: any, index: number) => (
                  <RowComponent_Report_Interactions
                    row={row}
                    index={index}
                    userData={userData}
                    totalScore = {totalScore}
                    handleResultShow={handleResultShow}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>

      <Dialog open={openanswerResult} onClose={handleCloseAnswerResult}>
        <DialogTitle>Questions Results ?</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper} sx={{ overflow: "auto" }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  {listTitles[2].map((title: any, index: number) => (
                    <StyledTableCell>{title}</StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {rows.map((row:any, index:number) => (
                <RowComponent setQuestionBank={setQuestionBank} row={row} index={index} userId = {userId} questionBank = {questionBank} status = {row.enableStatus} userData = {userData} />
              ))} */}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Report;
