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
  return data.map((newData)=>newData.surveyId);
}

export function setSurveys(surveys: Survey[]): Survey[] {
  const ostr = JSON.stringify(surveys as Survey[]);
  localStorage.setItem("myData", ostr);
  const data = JSON.parse(ostr || "[]") as Survey[];
  return data;
}

export function setSurveyById(id:string,survey: Survey): Survey[] {
  const surveys = getSurveys();
  const index = surveys.findIndex(x => x.surveyId === id);
  surveys[index] = survey
  const data = setSurveys(surveys);
  return data;
}

export function getSurveyByID(id: string): Survey {
  const surveys = getSurveys();
  const survey_searched = surveys.find(x => x.surveyId === id);
  if (survey_searched === undefined){
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
    const newData = {
      surveyId: surveyID,
      surveyName: surveyName,
      owner: owner,
      category: category,
      startDate: startDate,
      endDate: endDate,
      status: status,
      enableStatus: enableStatus,
      questions: questions,
    };
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
