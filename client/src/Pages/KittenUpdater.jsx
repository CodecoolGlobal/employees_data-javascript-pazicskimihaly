import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Components/Loading";

const updateEmployee = (employee) => {
    return fetch(`/api/employees/${employee._id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
    }).then((res) => res.json());
};

const fetchEmployee = (id) => {
    return fetch(`/api/employees/${id}`).then((res) => res.json());
};

const KittenUpdater = () => {
    const { id } = useParams();

    const [employee, setEmployee] = useState(null);
    const [employeeLoading, setEmployeeLoading] = useState(true);
    const [kittenName, setKittenName] = useState("")
    const [kittenWeight, setKittenWeight] = useState("")

    useEffect(() => {
        setEmployeeLoading(true);
        fetchEmployee(id)
            .then((employee) => {
                setEmployee(employee);
                setEmployeeLoading(false);
            })
            .catch((error) => {
                throw error;
            });
    }, [id]);

    if (employeeLoading) {
        return <Loading />;
    }

    const createKitten = () => {
        const newKitten = { ...employee }
        newKitten.kittens.push({
            name: kittenName,
            weight: kittenWeight,
        })
        updateEmployee(newKitten)
        setEmployee(newKitten)
    }

    return (
        <div>
            {
                employee.kittens.map((kitten, index) => {
                    return (
                        <li key={index}>{kitten.name} // {kitten.weight}</li>
                    )
                })  
            }
            <input placeholder="Name" onChange={(e) => { setKittenName(e.target.value) }}></input>
            <input placeholder="Weight" onChange={(e) => { setKittenWeight(e.target.value) }}></input>
            <button onClick={createKitten}>Submit</button>
        </div>
    );
};

export default KittenUpdater;