import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import TopTable from "../Components/TopTable.jsx";

const fetchTopEmployees = (signal) => {
    return fetch("/api/top-paid", { signal }).then((res) => res.json());
};

const TopEmployees = () => {
        const [loading, setLoading] = useState(true);
        const [data, setData] = useState(null)
    
        useEffect(() => {
          const controller = new AbortController();
      
          fetchTopEmployees(controller.signal)
            .then((top) => {
              setLoading(false);
              setData(top);
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
      
        return <TopTable top={data} />;
      
}
export default TopEmployees