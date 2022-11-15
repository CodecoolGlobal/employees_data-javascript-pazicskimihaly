import { useState } from "react";

const fetchEmployees = () => {
    return fetch("/api/employees/top-paid").then((res) => res.json());
  };

const TopPaid = () => {
    const [topPaid, setTopPaid] = useState(null)
    fetchEmployees()
    .then((employee) => {
        setTopPaid(employee)
    })

    return (
        <div>
            {topPaid && topPaid.length ?
            topPaid.map((employee, index) => {
                return (
            
                    <li key={index}>{employee.name} - {employee.currentSalary}</li>
                )
            }) : null}
        </div>
    )
}

export default TopPaid