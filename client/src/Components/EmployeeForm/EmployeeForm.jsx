import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

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
        <TextField
          defaultValue={employee ? employee.position : null}
          name="position"
          id="position"
          label="Position"
          variant="outlined"
        />
      </FormControl>

      <FormControl fullWidth>
        <TextField
          defaultValue={employee ? employee.startingDate : null}
          type="date"
          name="startingDate"
          id="startingDate"
          label="Starting Date"
          variant="outlined"
        />
      </FormControl>
      <FormControl fullWidth>
        <TextField
          defaultValue={employee ? employee.currentSalary : null}
          type="number"
          name="currentSalary"
          id="currentSalary"
          label="Current Salary"
          variant="outlined"
        />
      </FormControl>
      <FormControl fullWidth>
        <TextField
          defaultValue={employee ? employee.desiredSalary : null}
          type="number"
          name="desiredSalary"
          id="desiredSalary"
          label="Desired Salary"
          variant="outlined"
        />
      </FormControl>

      <FormControl fullWidth>
        <TextField
          defaultValue={employee ? employee.favouriteColor : null}
          type="color"
          name="favouriteColor"
          id="favouriteColor"
          label="Favourite Color"
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
