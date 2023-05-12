import {useMediaQuery,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Box} from "@mui/material";

const TablePart = ({ rows }) => {
  const mobile = useMediaQuery("(max-width:600px)");

  if(rows.dataID)delete rows.dataID;
  return (
    <Box sx={{display:'flex',flexDirection:!mobile?'row':'column'}}>
      <TableContainer
        component={Paper}
        style={{ width: "45%", display: "inline-block", paddingRight: "5px" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#e4ebe5" }}>
              <TableCell>Details</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(rows).map(
              (key, indx) =>
                indx % 2 === 0 && (
                  <TableRow
                    key={key}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {key}
                    </TableCell>
                    <TableCell align="right">{rows[key]}</TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer
        component={Paper}
        style={{ width: "45%", display: "inline-block", paddingRight: "5px" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#e4ebe5" }}>
              <TableCell>Details</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(rows).map(
              (key, indx) =>
                indx % 2 === 1 && (
                  <TableRow
                    key={key}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {key}
                    </TableCell>
                    <TableCell align="right">{rows[key]}</TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TablePart;
