import { useState } from "react";

const createCompany = (company) => {
  return fetch("/api/companies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(company),
  }).then((res) => res.json());
};

const CompanyCreator = () => {
  const [inputData, setInputData] = useState("")

  const onCreateCompany = () =>{
    const newCompany = {
        name : inputData,
    }
    createCompany(newCompany)
  }

  return (
    <div>
        <input type="text" onChange={(e) => {setInputData(e.target.value)}}></input>
        <button onClick={onCreateCompany}>Submit</button>
    </div>
  );
};

export default CompanyCreator;
