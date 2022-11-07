import { useEffect } from "react";
import { useState } from "react";
function TopEmployees() {

    const fetchTopEmployees = (signal) => {
        return fetch("/api/top-paid", { signal }).then((res) => res.json());
    };

    const TopEmployeeList = () => {
        const [data, setData] = useState(null);

        useEffect(() => {
            const controller = new AbortController();

            fetchTopEmployees(controller.signal)
                .then((TopEmployees) => {
                    setLoading(false);
                    setData(TopEmployees);
                })
                .catch((error) => {
                    if (error.name !== "AbortError") {
                        setData(null);
                        throw error;
                    }
                })

            return () => controller.abort();
        }, []);

    }
}

export default TopEmployees