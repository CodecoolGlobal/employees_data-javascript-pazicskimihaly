import React from "react";

function TopEmployees() {
    
const fetchTopEmployees = (signal) => {
    return fetch("/api/top-paid", { signal }).then((res) => res.json());
  };
    fetchTopEmployees()
    return (
        <div>
            hahah
        </div>
    )
}

export default TopEmployees