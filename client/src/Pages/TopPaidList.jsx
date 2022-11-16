import { useEffect, useState } from "react";
import Loading from "../Components/Loading";

const fetchEmployees = (signal) => {
    return fetch("/api/employees/top-paid").then((res) => res.json());
};

const TopPaidList = () => {
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

    return (
        <div>{data && data.length ? data.map((value) => {
            return (
                <div>{value.name} / {value.currentSalary}</div>
            )
        }) : null}
        </div>
    )
}

export default TopPaidList