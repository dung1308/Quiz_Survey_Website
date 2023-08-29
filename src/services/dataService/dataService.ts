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

export interface Survey {
  surveyId: string;
  surveyName: string;
  owner: string;
  category: string;
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
function createData(
  surveyId: number,
  surveyName: string,
  owner: string,
  category: string,
  startDate: string,
  endDate: string,
  status: string,
  enableStatus: boolean,
  questions: any
) {
  return {
    surveyId,
    surveyName,
    owner,
    category,
    startDate,
    endDate,
    status,
    enableStatus,
    questions,
  };
}
const updatedJSON = {
  "name":"arif updated",
  "surname":"shariati updated"
}
export class dataSevice{
  getSurvey(){
    return JSONdata;
  }
  getSurveyByID(id:string){
    return JSONdata.filter(data=>data.surveyId === id);
  }

  createSurvey(surveyName:string,
    owner:string,
    category:string,
    startDate:Date,
    endDate:Date,
    status:string,
    enableStatus:boolean = false,
    questions:any)
    
    {
      // surveyID is given random name


    }

  updateSurveyByID(id:string,owner:string,
    category:string,
    startDate:Date,
    endDate:Date,
    status:string,
    enableStatus:boolean = false,
    questions:any)
  
  {
    
  }

  removeSurveyById(id:string){
    return JSONdata.filter(data => data.surveyId !== id)

  }
  saveJSONFile(data:any){
    const fs = require("fs");
    fs.writeFile("../../data/data.json", data, (error:any) => {
      // throwing the error
      // in case of a writing problem
      if (error) {
        // logging the error
        console.error(error);
    
        throw error;
      }
    
      console.log("data.json written correctly");
    });
  }

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
