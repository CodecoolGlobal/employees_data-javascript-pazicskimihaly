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

const fetchCompanies = (signal) => {
  return fetch("/api/companies", { signal }).then((res) => res.json());
};

const CompanyCreator = () => {
  const [inputData, setInputData] = useState("")
  const [companyData, setCompanyData] = useState("")

  fetchCompanies()
    .then((company) => {
      setCompanyData(company);
    })

  const onCreateCompany = () => {
    const newCompany = {
      name: inputData,
    }
    createCompany(newCompany)
  }

  return (
    <div>
      <p>{ companyData && companyData.length ?
        companyData.map((company) => {
          return (
            <li key={company._id}>{company.name}</li>
          )
        }) : null}
      </p>
      <div>
        <input type="text" onChange={(e) => { setInputData(e.target.value) }}></input>
        <button onClick={onCreateCompany}>Submit</button>
      </div>
    </div>

  );
};

export default CompanyCreator;
