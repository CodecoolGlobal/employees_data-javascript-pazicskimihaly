import { useState, useEffect } from "react";
import Loading from "../Components/Loading";

const fetchPositions = () => {
    return fetch("/api/positions").then((res) => res.json());
};

const PositionList = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        fetchPositions(controller.signal)
            .then((positions) => {
                setLoading(false);
                setData(positions);
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
        <div>{data && data.length ? 
            data.map((value) => {
                return (
                    <div>{value.name} / {value.salary}</div>
                )
            })
            : null}
            </div>
    )
}

export default PositionList