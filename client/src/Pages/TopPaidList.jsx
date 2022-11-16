import { useState, useEffect } from "react";
import Loading from "../Components/Loading";

const fetchEmployees = () => {
    return fetch("/api/employees/top-paid").then((res) => res.json());
};

const TopList = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        fetchEmployees(controller.signal)
            .then((employees) => {
                setLoading(false);
                setData(employees);
            })
            .catch((error) => {
                if (error.name !== "AbortError") {
                    setData(null);
                    throw error;
                }
            })

        return () => controller.abort();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return ( data && data.length ?
        data.map((employee) => {
            return (
                <p>{employee.name} / {employee.currentSalary}</p>
            )
        }) : null
    )
}

export default TopList