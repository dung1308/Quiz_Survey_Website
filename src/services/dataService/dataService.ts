// import axios from 'axios';

// const url = "http://127.0.0.1:3003/user";

// export const getallUsers = async (id) => {
//     id = id || '';
//     return await axios.get(`${url}/${id}`);
// }

// export const addUser = async (user) => {
//     return await axios.post(url,user);
// }

// export const editUser = async (id, user) => {
//     return await axios.put(`${url}/${id}`,user);
// }

// export const deleteUser = async (id) => {
//     return await axios.delete(`${url}/${id}`);
// }

import JSONdata from "../../data/data.json";
import axios from "axios";
// import React from "react";

export interface Survey {
  surveyId: string;
  surveyName: string;
  owner: string;
  category: string;
  timer: string;
  startDate: string;
  endDate: string;
  status: string;
  questions: Question[];
}

export interface Question {
  no: number;
  question: string;
  choices: string[];
  type: string;
  answer: string[];
}
export const updatedJSON = {
  name: "arif updated",
  surname: "shariati updated",
};
export function getSurveys(): Survey[] {
  const objStr = localStorage.getItem("myData");
  let data: Survey[] = JSON.parse(objStr || "null");

  if (data === null) {
    // console.log(JSON.stringify(JSONdata));
    const ostr = JSON.stringify(JSONdata as Survey[]);
    localStorage.setItem("myData", ostr);
    data = JSON.parse(ostr || "[]") as Survey[];
  }
  return data;
}

export function getSurveyId() {
  const objStr = localStorage.getItem("myData");
  let data: Survey[] = JSON.parse(objStr || "null");

  if (data === null) {
    // console.log(JSON.stringify(JSONdata));
    const ostr = JSON.stringify(JSONdata as Survey[]);
    localStorage.setItem("myData", ostr);
    data = JSON.parse(ostr || "[]") as Survey[];
  }
  return data.map((newData) => newData.surveyId);
}

export function setSurveys(surveys: Survey[]): Survey[] {
  const ostr = JSON.stringify(surveys as Survey[]);
  localStorage.setItem("myData", ostr);
  const data = JSON.parse(ostr || "[]") as Survey[];
  return data;
}

export function getSurveyByID(id: string): Survey {
  const surveys = getSurveys();
  const survey_searched = surveys.find((x) => x.surveyId === id);
  if (survey_searched === undefined) {
    return {
      surveyId: "",
      surveyName: "Geography of Countries",
      owner: "Random",
      category: "Survey",
      timer: "15:20",
      startDate: "2023/02/02",
      endDate: "2023/07/07",
      status: "composing",
      questions: [
        {
          no: 1,
          question: "What is the capital of Vietnam?",
          choices: ["Paris", "London", "New York"],
          type: "Quiz",
          answer: ["Paris", "London"],
        },
      ],
    };
  }
  return survey_searched;
}

export function createSurvey1(survey: any) {
  // surveyID is given random name
  const newSurvey = {
    surveyId: survey.surveyId,
    surveyName: survey.surveyName,
    owner: survey.owner,
    category: survey.category,
    timer: survey.timer,
    startDate: survey.startDate,
    endDate: survey.endDate,
    status: survey.status,
    enableStatus: survey.enableStatus,
    questions: survey.questions,
  };

  const readSurveys = getSurveys();

  const newSurveys = [...readSurveys, newSurvey];

  setSurveys(newSurveys);

  return JSONdata;
}

export function createSurvey2(
  surveyID: string,
  surveyName: string,
  owner: string,
  category: string,
  timer: string,
  startDate: string,
  endDate: string,
  status: string,
  enableStatus: boolean = false,
  questions: any
) {
  // surveyID is given random name
  const newData = {
    surveyId: surveyID,
    surveyName: surveyName,
    owner: owner,
    category: category,
    timer: timer,
    startDate: startDate,
    endDate: endDate,
    status: status,
    enableStatus: enableStatus,
    questions: questions,
  };
  JSONdata.push(newData);
  //createSurvey(surveyId: string; surveyName: string;
  // owner: string; category: string; startDate: string;
  // endDate: string; status: string; enableStatus: boolean; questions:
  // { no: number; question: string; choices: string[]; type: string;
  //   answer: string[];)
  return JSONdata;
}

export function updateSurveyByID(id: string, survey: any) {}

export function removeSurveyById(id: string) {
  return JSONdata.filter((data) => data.surveyId !== id);
}

export const saveSurvey = async (jsonData: any) => {
  try {
    const response = await axios.post("../../data/data", jsonData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Data updated successfully:", response.data);
  } catch (error) {
    console.error("Error updating data:", error);
  }
  return 0;
};
export function SaveSurvey2(jsonSurvey: any) {
  return 0;
}
export function createLocalSurveys(data: any) {
  fetch("data.json")
    .then((response) => response.json())
    .then((data: any) => {
      const existingData = localStorage.getItem("myData");
      const newData = existingData
        ? { ...JSON.parse(existingData), ...data }
        : data;
      localStorage.setItem("myData", JSON.stringify(newData));
    })
    .catch((error) => console.error(error));
}

// function saveJSONFile(data:any){
//   const fs = require("fs");
//   fs.writeFile("../../data/data.json", data, (error:any) => {
//     // throwing the error
//     // in case of a writing problem
//     if (error) {
//       // logging the error
//       console.error(error);

//       throw error;
//     }

//     console.log("data.json written correctly");
//   });
// }

export class dataSevice {
  getSurvey() {
    return JSONdata;
  }
  getSurveyByID(id: string) {
    return JSONdata.filter((data) => data.surveyId === id);
  }

  createSurvey(
    surveyID: string,
    surveyName: string,
    owner: string,
    category: string,
    startDate: string,
    endDate: string,
    status: string,
    enableStatus: boolean = false,
    questions: any
  ) {
    // surveyID is given random name
    // const newData = {
    //   surveyId: surveyID,
    //   surveyName: surveyName,
    //   owner: owner,
    //   category: category,
    //   startDate: startDate,
    //   endDate: endDate,
    //   status: status,
    //   enableStatus: enableStatus,
    //   questions: questions,
    // };
    //JSONdata.push(newData);

    return JSONdata;
  }

  updateSurveyByID(
    id: string,
    owner: string,
    category: string,
    startDate: Date,
    endDate: Date,
    status: string,
    enableStatus: boolean = false,
    questions: any
  ) {}

  removeSurveyById(id: string) {
    return JSONdata.filter((data) => data.surveyId !== id);
  }
  // saveJSONFile(data:any){
  //   const fs = require("fs");
  //   fs.writeFile("../../data/data.json", data, (error:any) => {
  //     // throwing the error
  //     // in case of a writing problem
  //     if (error) {
  //       // logging the error
  //       console.error(error);

  //       throw error;
  //     }

  //     console.log("data.json written correctly");
  //   });
  // }
}

// export const JSON_Fetch = () =>{
//   fetch('../../data/data.json')
// .then(response => response.json())
// .then(config => {
//   // Áp dụng cấu hình vào ứng dụng
//   document.body.style.backgroundColor = config.color;
//   document.body.style.fontSize = `${config.fontSize}px`;
//   // ...
// })
// .then(data => {
//   // Xử lý và hiển thị dữ liệu từ API
//   console.log(data);
//   // ...
// })
// .catch(error => {
//   console.error('Lỗi khi đọc file JSON:', error);
// });
// }

export class Role {
  id: number;
  roleName: string;
  permission: string;
  constructor(id: number, roleName: string, permission: string) {
    this.id = id;
    this.roleName = roleName;
    this.permission = permission;
  }
}
interface Category {
  id: number;
  categoryName: string;
}

interface ResultShowDTO {
  id: number;
  onAnswers: string[];
  resultScore: number;
  questionId: number;
  questionBankInteractId: number;
}

export class UserDTO {
  id: number;
  userName: string;
  password: string;
  email: string;
  isNightMode: boolean;
  roleId: number;

  constructor(
    id: number,
    userName: string,
    password: string,
    email: string,
    isNightMode: boolean,
    roleId: number
  ) {
    this.id = id;
    this.userName = userName;
    this.password = password;
    this.email = email;
    this.isNightMode = isNightMode;
    this.roleId = roleId;
  }
}

interface LoginUserDTO {
  userName: string;
  password: string;
}

interface ReportDTO {
  questionBankId: number;
  surveyName: string;
  userName: string;
  resultScores: number;
}

export class ReportWithPages {
  pagedItems: ReportDTO[];
  pages: number;

  constructor(data: any) {
    this.pagedItems = data.pagedItems;
    this.pages = data.pages;
  }
}

interface ItemsDTO {
  id: number;
  questionBankId: number;
  userId: number;
  surveyName: string;
  userName: string;
  ownerName: string;
  ownerId: number;
  endDate: string;
  dateTimeNow: string;
  resultScores: number;

}

interface MultipleReportDTO {
  questionBankId: number;
  userId: number;
  surveyName: string;
  userName: string;
  ownerName: string;
  items: ItemsDTO[];
}

export class MultipleReportWithPagination {
  pages: number;
  numOfItems: number;
  data: MultipleReportDTO[];

  constructor(data: any) {
    this.pages = data.pages;
    this.numOfItems = data.numOfItems;
    this.data = data.data;
  }
}

interface DataAnswerDTO {
  id: number;
  questionName: string;
  result: number;
  onAnswers: string[];
  rightAnswers: string[];
}

export class AnswerReport {
  data: DataAnswerDTO[];

  constructor(data: any) {
    this.data = data.data;
  }
}

export class Interaction {
  id: number;
  resultScores: number;
  userId: number;
  questionBankId: number;
  resultShowDTOs: ResultShowDTO[];

  constructor(data: any) {
    this.id = data.id;
    this.resultScores = data.resultScores;
    this.userId = data.userId;
    this.questionBankId = data.questionBankId;
    this.resultShowDTOs = data.resultShowDTOs;
  }
}

export class InviteUserDTO {
  id: number;
  resultScores: number;
  userId: number;
  questionBankId: number;

  constructor(
    id: number,
    resultScores: number,
    userId: number,
    questionBankId: number
  ) {
    this.id = id;
    this.resultScores = resultScores;
    this.userId = userId;
    this.questionBankId = questionBankId;
  }
}

interface ScoreListDTO {
  id: number;
  score: number;
}

interface QuestionDTO {
  id: number;
  questionName: string;
  choices: string[];
  type: string;
  answers: string[];
  score: number;
  questionBankId: number;
}

interface ScoreListDTO {
  id: number;
  score: number;
}

interface DefaultScoreDTO {
  scoreList: ScoreListDTO;
  totalScore: number;
}

export class QuestionBank {
  id: number;
  surveyCode: string;
  surveyName: string;
  owner: string;
  timer: string;
  startDate: string;
  endDate: string;
  status: string;
  enableStatus: boolean;
  categoryListId: number;
  categoryName: string;
  userId: number;
  dateTimeNow: string;
  participantIdList: number[];
  userDoneIdList: number[];
  questionDTOs: QuestionDTO[];

  constructor(data: any) {
    this.id = data.id;
    this.surveyCode = data.surveyCode;
    this.surveyName = data.surveyName;
    this.owner = data.owner;
    this.timer = data.timer;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.status = data.status;
    this.enableStatus = data.enableStatus;
    this.categoryListId = data.categoryListId;
    this.categoryName = data.categoryName;
    this.userId = data.userId;
    this.dateTimeNow = data.dateTimeNow;
    this.participantIdList = data.participantIdList;
    this.userDoneIdList = data.userDoneIdList;
    this.questionDTOs = data.questionDTOs;
  }
}

export class MultipleQuestionBankWithPagination {
  pages: number;
  numOfItems: number;
  data: QuestionBank[];

  constructor(data: any) {
    this.pages = data.pages;
    this.numOfItems = data.numOfItems;
    this.data = data.data;
  }
}

export async function GetRoles(): Promise<Role[]> {
  return axios
    .get<Role[]>("https://localhost:7232/Roles")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}

export async function GetRoleById(roleId: number) {
  return axios
    .get<Role>(`https://localhost:7232/Role/${roleId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}

export async function GetCurrentDate(): Promise<string> {
  return axios
    .get("https://localhost:7232/GetCurrentDate")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}

export async function GetCategories(): Promise<Category[]> {
  return axios
    .get<Category[]>("https://localhost:7232/Categories")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}
export async function getSurveyCodes() {
  try {
    const response = await axios.get("https://localhost:7232/GetSurveyCode");
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getUserNames() {
  try {
    const response = await axios.get("https://localhost:7232/GetUserNames");
    return response.data;
  } catch (error) {
    console.log((error as Error).message);
    return [];
  }
}

export async function GetUserNameById(userId: number): Promise<UserDTO> {
  return axios
    .get(`https://localhost:7232/User/${userId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}

// export async function GetQuestionBankById(id: number): Promise<QuestionBank[]> {
//   return axios
//       .get<QuestionBank[]>(`https://localhost:7232/GetQuestionBank/${id}`)
//       .then((response) => {
//         return response.data;
//       })
//       .catch((error) => {
//         console.log(error);
//         return [];
//       });
// }
export async function GetLatestInteractByUserAndQuestionBank(
  userId: number,
  questionBankId: number
): Promise<Interaction> {
  return axios
    .get(
      `https://localhost:7232/User/${userId}/QuestionBank/${questionBankId}/questionBankInteractLatest`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}

export async function GetDefaultScores(
  questionBankId: number
): Promise<DefaultScoreDTO> {
  return axios
    .get(
      `https://localhost:7232/GetScoreAndTotalScore?questionBankId=${questionBankId}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}

export async function LoginData(user: LoginUserDTO): Promise<UserDTO> {
  return axios
    .post("https://localhost:7232/LoginUser", user)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        return error.response.data;
      } else {
        console.log(error);
        return null;
      }
    });
}

export async function GetQuestionBankById(id: number): Promise<QuestionBank> {
  return axios
    .get(`https://localhost:7232/GetQuestionBank/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}

export async function GetQuestionBankByUserId(
  userId: number
): Promise<QuestionBank[]> {
  return axios
    .get<QuestionBank[]>(
      `https://localhost:7232/User/${userId}/GetQuestionBank`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}

// export async function GetQuestionBankByUserIdAscOrDes(
//   userId: number,
//   pageSize: number,
//   pageNumber: number,
//   ascendingOrNot: string
// ): Promise<MultipleQuestionBankWithPagination> {
//   return axios
//     .get(
//       `https://localhost:7232/GetQuestionBankWithPaginationAscOrDes?userId=${userId}&pageSize=${pageSize}&pageNumber=${pageNumber}&filterAsc=${ascendingOrNot}`
//     )
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       console.log(error);
//       return [];
//     });
// }

export async function GetQuestionBankByUserIdAscOrDes(
  userId: number,
  pageSize: number,
  pageNumber: number,
  ascendingOrNot: string
): Promise<MultipleQuestionBankWithPagination> {
  return axios
    .get(
      `https://localhost:7232/GetSurveysWithPaginationAscOrDes?userId=${userId}&pageSize=${pageSize}&pageNumber=${pageNumber}&filterAsc=${ascendingOrNot}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}

export async function GetAllQuestionBanks(): Promise<QuestionBank[]> {
  return axios
    .get<QuestionBank[]>("https://localhost:7232/GetQuestionBank")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}

export async function GetDistinctQuestionBankInteractByUser(
  userId: number
): Promise<ReportDTO[]> {
  return axios
    .get<ReportDTO[]>(
      `https://localhost:7232/User/${userId}/GetQuestionBankInteractByUserDistinct`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}

export async function GetDistinctReportsByOwner(
  userId: number,
  pageSize: number,
  pageNumber: number
): Promise<ReportWithPages> {
  return axios
    .get(
      `https://localhost:7232/GetReportDistinctByOwner?userId=${userId}&pageSize=${pageSize}&pageNumber=${pageNumber}`
    )
    .then((response) => {
      if (
        response.data.pagedItems !== undefined &&
        response.data.pagedItems !== null
      ) {
        return new ReportWithPages(response.data);
      } else {
        return new ReportWithPages({ pagedItems: [], pages: 0 });
      }
    })
    .catch((error) => {
      console.log(error);
      return new ReportWithPages({ reportDTO: [], pages: 0 });
    });
}

export async function GetMultipleReports(
  permission: string,
  userId: number,
  pageSize: number,
  pageNumber: number
): Promise<MultipleReportWithPagination> {
  return axios
    .get(
      `https://localhost:7232/GetQuestionBankInteractsWithPagination?permission=${permission}&userId=${userId}&pageSize=${pageSize}&pageNumber=${pageNumber}`
    )
    .then((response) => {
      if (response.data.data !== undefined && response.data.data !== null) {
        return new MultipleReportWithPagination(response.data);
      } else {
        return new MultipleReportWithPagination({
          pages: 0,
          numOfItems: 0,
          data: [],
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return new MultipleReportWithPagination({
        pages: 0,
        numOfItems: 0,
        data: [],
      });
    });
}

export async function GetMultipleReportsAscOrDes(
  permission: string,
  userId: number,
  pageSize: number,
  pageNumber: number,
  ascendingOrNot: string
): Promise<MultipleReportWithPagination> {
  return axios
    .get(
      `https://localhost:7232/GetQuestionBankInteractsWithPaginationAscOrDes?permission=${permission}&userId=${userId}&pageSize=${pageSize}&pageNumber=${pageNumber}&filterAsc=${ascendingOrNot}`
    )
    .then((response) => {
      if (response.data.data !== undefined && response.data.data !== null) {
        return new MultipleReportWithPagination(response.data);
      } else {
        return new MultipleReportWithPagination({
          pages: 0,
          numOfItems: 0,
          data: [],
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return new MultipleReportWithPagination({
        pages: 0,
        numOfItems: 0,
        data: [],
      });
    });
}

export async function GetMultipleReportsFilteredAscOrDes(
  userId: number,
  pageSize: number,
  pageNumber: number,
  ascendingOrNot: boolean,
  ownerName: string,
  surveyName: string,
  userName: string,
): Promise<MultipleReportWithPagination> {
  return axios
    .get(
      `https://localhost:7232/GetReportsFiltered?userId=${userId}&pageSize=${pageSize}&pageNumber=${pageNumber}&ascOrNot=${ascendingOrNot}&ownerName=${ownerName}&surveyName=${surveyName}&userName=${userName}`
    )
    .then((response) => {
      if (response.data.data !== undefined && response.data.data !== null) {
        return new MultipleReportWithPagination(response.data);
      } else {
        return new MultipleReportWithPagination({
          pages: 0,
          numOfItems: 0,
          data: [],
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return new MultipleReportWithPagination({
        pages: 0,
        numOfItems: 0,
        data: [],
      });
    });
}

export async function GetMultipleReportsWithQuestionBankName(
  permission: string,
  userId: number,
  pageSize: number,
  pageNumber: number,
  ascendingOrNot: string,
  questionBankName: string
): Promise<MultipleReportWithPagination> {
  return axios
    .get(
      `https://localhost:7232/GetQuestionBankInteractsWithPaginationWithQuestionBankName?permission=${permission}&userId=${userId}&pageSize=${pageSize}&pageNumber=${pageNumber}&filterAsc=${ascendingOrNot}&questionBankName=${questionBankName}`
    )
    .then((response) => {
      if (response.data.data !== undefined && response.data.data !== null) {
        return new MultipleReportWithPagination(response.data);
      } else {
        return new MultipleReportWithPagination({
          pages: 0,
          numOfItems: 0,
          data: [],
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return new MultipleReportWithPagination({
        pages: 0,
        numOfItems: 0,
        data: [],
      });
    });
}

export async function GetMultipleReportsWithUserName(
  permission: string,
  userId: number,
  pageSize: number,
  pageNumber: number,
  ascendingOrNot: string,
  userName: string
): Promise<MultipleReportWithPagination> {
  return axios
    .get(
      `https://localhost:7232/GetQuestionBankInteractsWithPaginationWithUserName?permission=${permission}&userId=${userId}&pageSize=${pageSize}&pageNumber=${pageNumber}&filterAsc=${ascendingOrNot}&userName=${userName}`
    )
    .then((response) => {
      if (response.data.data !== undefined && response.data.data !== null) {
        return new MultipleReportWithPagination(response.data);
      } else {
        return new MultipleReportWithPagination({
          pages: 0,
          numOfItems: 0,
          data: [],
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return new MultipleReportWithPagination({
        pages: 0,
        numOfItems: 0,
        data: [],
      });
    });
}

export async function GetAnswerReports(
  questionBankInteractId: number
): Promise<AnswerReport> {
  return axios
    .get(
      `https://localhost:7232/GetAnswerReport?questionBankInteractsId=${questionBankInteractId}`
    )
    .then((response) => {
      if (response.data.data !== undefined && response.data.data !== null) {
        return new AnswerReport(response.data);
      } else {
        return new AnswerReport({ data: [] });
      }
    })
    .catch((error) => {
      console.log(error);
      return new AnswerReport({ data: [] });
    });
}

export async function GetMultipleReportsForAdmin(
  userId: number,
  pageSize: number,
  pageNumber: number
): Promise<MultipleReportWithPagination> {
  return axios
    .get(
      `https://localhost:7232/GetQuestionBankInteractsForAdmin?userId=${userId}&pageSize=${pageSize}&pageNumber=${pageNumber}`
    )
    .then((response) => {
      if (response.data.data !== undefined && response.data.data !== null) {
        return new MultipleReportWithPagination(response.data);
      } else {
        return new MultipleReportWithPagination({
          pages: 0,
          numOfItems: 0,
          data: [],
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return new MultipleReportWithPagination({
        pages: 0,
        numOfItems: 0,
        data: [],
      });
    });
}

export async function GetInteractionsByUserAndQuestionBank(
  userId: number,
  questionBankId: number
): Promise<Interaction[]> {
  return axios
    .get<Interaction[]>(
      `https://localhost:7232/User/${userId}/QuestionBank/${questionBankId}/questionBankInteracts`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}

export async function GetInteractionsByInteractId(
  questionBankInteractId: number
): Promise<Interaction> {
  return axios
    .get(
      `https://localhost:7232/questionBankInteracts/${questionBankInteractId}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}

export async function GetLimitedInteractionsByUserAndQuestionBank(
  userId: number,
  questionBankId: number,
  limitedNumber: number
): Promise<Interaction[]> {
  return axios
    .get<Interaction[]>(
      `https://localhost:7232/GetQuestionBankInteractsUpTo?userId=${userId}&questionBankId=${questionBankId}&limitNumber=${limitedNumber}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}

export async function GetQuestionBankByUserAndCategory(
  userId: number,
  categoryId: number
): Promise<QuestionBank[]> {
  return axios
    .get<QuestionBank[]>(
      `https://localhost:7232/User/${userId}/Category/${categoryId}/GetQuestionBank`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}

export async function CreateQuestionBank(questionBank: QuestionBank) {
  try {
    const response = await axios.post(
      "https://localhost:7232/AddQuestionBank",
      questionBank
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

export async function CreateQuestionBankByUserId(
  // userId: number,
  questionBank: QuestionBank
) {
  try {
    const response = await axios.post(
      `https://localhost:7232/AddQuestionBankAndInteract`,
      questionBank
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

export async function CreateCategory(category: Category) {
  try {
    const response = await axios.post(
      `https://localhost:7232/AddCategory`,
      category
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
export async function CreateUser(user: UserDTO) {
  return axios
    .post(`https://localhost:7232/Register`, user)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        return error.response.data;
      } else {
        console.log(error);
        return null;
      }
    });
}

export async function InviteUser(userName: string, invietUser: InviteUserDTO) {
  try {
    const response = await axios.post(
      `https://localhost:7232/InviteUser?userName=${userName}`,
      invietUser
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

export async function CreateAnswer(questionBankInteract: Interaction) {
  try {
    const response = await axios.post<Interaction>(
      `https://localhost:7232/CreateAnswer`,
      questionBankInteract
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

export async function CreateAnswerAnonymous(
  questionBankInteract: Interaction
): Promise<Interaction> {
  return axios
    .post<Interaction>(
      `https://localhost:7232/CreateAnswerAnonymous`,
      questionBankInteract
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        return error.response.data;
      } else {
        console.log(error);
        return null;
      }
    });
}

export async function setQuestionBankById(
  id: number,
  questionBank: QuestionBank
) {
  try {
    const response = await axios.put(
      `https://localhost:7232/UpdateQuestionBank?id=${id}`,
      questionBank
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

export async function setNightModeUser(
  id: number,
  userDTO: UserDTO
): Promise<UserDTO> {
  return axios
    .put(`https://localhost:7232/ChangeNightMode?id=${id}`, userDTO)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}

export async function setEnableStatusQuestionBank(
  id: number,
  enableStatus: Boolean
) {
  return axios
    .put(
      `https://localhost:7232/UpdateEnabledStatus?id=${id}&enableStatus=${enableStatus}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}

export async function setStatusAfterJoin(
  userId: number,
  questionBankId: number
) {
  return axios
    .put(
      `https://localhost:7232/UpdateStatusAfterJoin?userId=${userId}&questionBankId=${questionBankId}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}

export async function GetAndSetParticipantForSurvey(
  questionBankId: number,
  userId: number
): Promise<QuestionBank> {
  return (
    axios
      .put(
        `https://localhost:7232/GetAndSetParticipantList?questionBankId=${questionBankId}`,
        new UserDTO(userId, "", "", "", false, 0)
      )
      // constructor(
      //   id: number,
      //   userName: string,
      //   password: string,
      //   email: string,
      //   isNightMode: boolean,
      //   roleId: number
      // )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      })
  );
}

export async function RemoveParticipantForSurvey(
  questionBankId: number,
  userId: number
): Promise<QuestionBank> {
  return (
    axios
      .put(
        `https://localhost:7232/RemoveParticipantId?questionBankId=${questionBankId}`,
        new UserDTO(userId, "", "", "", false, 0)
      )
      // constructor(
      //   id: number,
      //   userName: string,
      //   password: string,
      //   email: string,
      //   isNightMode: boolean,
      //   roleId: number
      // )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      })
  );
}

export async function GetQuestionsByQuestionBankId(questionBankId: number) {
  return axios
    .get(`https://localhost:7232/GetQuestionBank/${questionBankId}/Question`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}

export async function deleteQuestionById(id: string): Promise<Boolean> {
  return axios
    .delete(`https://localhost:7232/DeleteQuestion?id=${id}`)
    .then((response) => {
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}
