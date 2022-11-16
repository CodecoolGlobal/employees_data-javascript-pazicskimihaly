import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

const fetchPositions = () => {
  return fetch("/api/positions").then((res) => res.json());
};



const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});

    return onSave(employee);
  };

  const [data, setData] = useState(null);
  useEffect(() => {
    const controller = new AbortController();

    fetchPositions(controller.signal)
      .then((positions) => {
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

  return (
    <Box
      sx={{ margin: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}
      component="form"
      onSubmit={onSubmit}
    >
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}

      <FormControl fullWidth>
        <TextField
          defaultValue={employee ? employee.name : null}
          name="name"
          id="name"
          label="Name"
          variant="outlined"
        />
      </FormControl>

      <FormControl fullWidth>
        <TextField
          defaultValue={employee ? employee.level : null}
          name="level"
          id="level"
          label="Level"
          variant="outlined"
        />
      </FormControl>

      <FormControl fullWidth>
        <select name="position" id="position">
        {data && data.length ? data.map((value) => {
          return (
            <option>{value.name}</option>
          )
        }) : null}
        </select>
      </FormControl>

      <div>
        <Button
          sx={{ marginRight: "1rem" }}
          variant="contained"
          type="submit"
          disabled={disabled}
        >
          {employee ? "Update Employee" : "Create Employee"}
        </Button>

        <Button variant="contained" color="warning" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Box>
  );
};

export default EmployeeForm;
