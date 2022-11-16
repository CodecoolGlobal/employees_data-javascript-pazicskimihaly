import { useState, useEffect } from "react";
import Loading from "../Components/Loading";
import { useNavigate, useParams } from "react-router-dom";

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
  const [updateLoading, setUpdateLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(true);
  const [kittyName, setKittyName] = useState("")
  const [kittyWeight, setKittyWeight] = useState("")

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

  const addNewKitten = () => {
    const newKitten = {...employee}
    newKitten.kittens.push({
        name : kittyName,
        weight : kittyWeight,
    })
    updateEmployee(newKitten)
    setEmployee(newKitten)
  }

  return (

    <div>
        <div>{employee.kittens.map((value) => {
            return (
                <div>{value.name} / {value.weight}</div>
            )
        })}</div>
        <input placeholder="Name" onChange={(e) => {setKittyName(e.target.value)}}></input>
        <input placeholder="weight" onChange={(e) => {setKittyWeight(e.target.value)}}></input>
        <button onClick={addNewKitten}>Submit</button>
    </div>
  );
}

export default KittenUpdater