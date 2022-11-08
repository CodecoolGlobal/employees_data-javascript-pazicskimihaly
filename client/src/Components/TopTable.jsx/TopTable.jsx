import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TopTable = ({ top }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="left">Name</TableCell>
          <TableCell align="left">Level</TableCell>
          <TableCell align="left">Position</TableCell>
          <TableCell align="left">Salary</TableCell>
          <TableCell align="left"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {top && top.length
          ? top.map((top) => (
              <TableRow key={top._id}>
                <TableCell align="left">{top.name}</TableCell>
                <TableCell align="left">{top.level}</TableCell>
                <TableCell align="left">{top.position}</TableCell>
                <TableCell align="left">{top.salary}</TableCell>
                <TableCell align="left">
                </TableCell>
              </TableRow>
            ))
          : null}
      </TableBody>
    </Table>
  </TableContainer>
);

export default TopTable;