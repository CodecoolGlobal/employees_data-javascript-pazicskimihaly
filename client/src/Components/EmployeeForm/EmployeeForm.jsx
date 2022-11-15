import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const fetchCompany = () => {
  return fetch(`/api/companies/`).then((res) => res.json());
};

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    ;
    fetchCompany(id)
      .then((company) => {
        setCompany(company);
      })
      .catch((error) => {
        throw error;
      });
  }, [id]);;

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

      <select>
        {company && company.length ?
          company.map((companies) => {
            return (
              <option
                key={companies._id}
                value={companies._id}
                defaultValue={employee ? employee.company : null}
              > {companies.name} </option>
            )
          }) : null}
      </select>

      <FormControl fullWidth>
        <TextField
          defaultValue={employee ? employee.position : null}
          name="position"
          id="position"
          label="Position"
          variant="outlined"
        />
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
