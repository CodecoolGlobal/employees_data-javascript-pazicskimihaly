import { useEffect, useState } from "react";

const fetchTools = (signal) => {
  return fetch("/api/tools", { signal }).then((res) => res.json());
};

const ToolList = () => {
  const [loading, setLoading] = useState(true);
  const [filterName, setFilterName] = useState("");
  const [tools, setTools] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    fetchTools(controller.signal)
      .then((tools) => {
        setLoading(false);
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

  const showTools = tools
    .filter((value) => {
      if (filterName == "") {
        return value;
      } else if (value.name.toLowerCase().includes(filterName.toLowerCase())) {
        return value;
      }
    })
    .map((tool, key) => {
      return (
        <div className="tool" key={key}>
          {tool.name} - {tool.weight} kg
        </div>
      );
    });

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          setFilterName(e.target.value);
        }}
      ></input>
      <div>{showTools}</div>
    </>
  );
};

export default ToolList;

