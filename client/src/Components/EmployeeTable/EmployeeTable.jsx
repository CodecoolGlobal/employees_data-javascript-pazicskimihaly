import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";

const EmployeeTable = ({ employees, onDelete }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="left">Name</TableCell>
          <TableCell align="left">Level</TableCell>
          <TableCell align="left">Position</TableCell>
          <TableCell align="left">Starting Date</TableCell>
          <TableCell align="left">Current Salary</TableCell>
          <TableCell align="left">Desired Salary</TableCell>
          <TableCell align="left">Favourite Color</TableCell>
          <TableCell align="left">Difference</TableCell>
          <TableCell align="left"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {employees && employees.length
          ? employees.map((employee) => (
            <TableRow key={employee._id}>
              <TableCell align="left">{employee.name}</TableCell>
              <TableCell align="left">{employee.level}</TableCell>
              <TableCell align="left">{employee.position}</TableCell>
              <TableCell align="left">{employee.startingDate}</TableCell>
              <TableCell align="left">{employee.currentSalary}</TableCell>
              <TableCell align="left">{employee.desiredSalary}</TableCell>
              <TableCell sx={{ backgroundColor : employee.favouriteColor }} align="left">{employee.favouriteColor}</TableCell>
              <TableCell align="left">{employee.desiredSalary - employee.currentSalary}</TableCell>
              <TableCell align="left">
                <Link to={`/update/${employee._id}`}>
                  <Button variant="outlined">Update</Button>
                </Link>
                <Button
                  onClick={() => { if (window.confirm("Would you like to delete this employee?")) { onDelete(employee._id) } else { alert("Cancelled") } }}
                  startIcon={<DeleteIcon />}
                  variant="outlined"
                  color="warning"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))
          : null}
      </TableBody>
    </Table>
  </TableContainer>
);

export default EmployeeTable;
