import React, { useEffect, useState } from 'react';
import Layout from '../../components/templates/layout';
import { GetDistinctQuestionBankByUser, QuestionBank, UserDTO } from '../../services/dataService/dataService';

const Report: React.FC  = () =>  {
    const newData = localStorage.getItem("currentUser") ?? JSON.stringify(new UserDTO(0, "", "", "", 0));
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<UserDTO>(JSON.parse(newData));
    const [questionBank, setQuestionBank] = useState<QuestionBank[]>([]);

    useEffect(() => {
        setLoading(true);
        setUserData(JSON.parse(newData));
        console.log(userData)
        GetDistinctQuestionBankByUser(userData.id).then((data) => {
          setQuestionBank(data.reverse());
          setTimeout(() => {
            setLoading(false);
          }, 1000)
          setLoading(false);
          console.log(data)
        });
      }, [setUserData]);
      
    return(
        <>
            <Layout/>
            <div>
                <h1>report</h1>
            </div>
        </>
    );
}

export default Report;