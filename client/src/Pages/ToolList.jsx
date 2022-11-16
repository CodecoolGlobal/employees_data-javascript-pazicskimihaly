import { useState, useEffect } from "react";
import Loading from "../Components/Loading";

const fetchTools = () => {
    return fetch("/api/tools").then((res) => res.json());
};

const ToolList = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [filter, setFilter] = useState("")

    useEffect(() => {
        const controller = new AbortController();

        fetchTools(controller.signal)
            .then((tools) => {
                setLoading(false);
                setData(tools);
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

    const filteredTools = data.filter((value) => {
        if(filter === "") {
            return value
        } else if (value.name.toLowerCase().includes(filter.toLocaleLowerCase())) {
            return value
        }
    })

    return (
        <div>
            <input onChange={(e) => {setFilter(e.target.value)}}></input>
            {filteredTools && filteredTools.length ?
                filteredTools.map((value) => {
                    return (
                        <div>{value.name} / {value.weight}</div>
                    )
                }) : null}
        </div>
    )
}

export default ToolList