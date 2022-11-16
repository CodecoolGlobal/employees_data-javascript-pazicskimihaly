import { useState, useEffect } from "react";

const fetchTools = (signal) => {
    return fetch("/api/tools", { signal }).then((res) => res.json());
};

const ToolsList = () => {
    const [tools, setTools] = useState([]);
    const [filterName, setFilterName] = useState("")

    useEffect(() => {
        const controller = new AbortController();

        fetchTools(controller.signal)
            .then((tools) => {
                setTools(tools);
            })
            .catch((error) => {
                if (error.name !== "AbortError") {
                    setTools(null);
                    throw error;
                }
            })

        return () => controller.abort();
    }, []);

    const showTools = tools.filter((value) => {
        if (filterName == "") {
            return value
        } else if (value.name.toLowerCase().includes(filterName.toLowerCase())) {
            return value
        }
    })

    return (
        
        <div>
            <div><input type="text" onChange={(e) => {setFilterName(e.target.value)}}></input></div>
            {showTools && showTools.length ?
                showTools.map((tool) => {
                    return (
                        <p>{tool.name} / {tool.weight}</p>
                    )
                }) : null}
        </div>
    )

}

export default ToolsList