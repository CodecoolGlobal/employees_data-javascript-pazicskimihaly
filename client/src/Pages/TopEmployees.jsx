import React from "react";

function TopEmployees() {
    function getData() {
        fetch("/top-paid").then((response) => response.json()).then((data) => console.log(data))
    }
    getData()
    return (
        <div>
            Top Employees
        </div>
    )
}

export default TopEmployees