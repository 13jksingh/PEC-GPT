import {useMediaQuery,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Box} from "@mui/material";

const TablePart = ({ rows }) => {
  const mobile = useMediaQuery("(max-width:600px)");

  if(rows.dataID)delete rows.dataID;
  return (
<<<<<<< HEAD
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
=======
    <TableContainer component={Paper} style={{width:"45%",display:"inline-block",paddingRight:"5px" , verticalAlign:"top"}}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow style={{backgroundColor:"#e4ebe5"}}>
            <TableCell>{props.title}</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
>>>>>>> 4d8898fd77f00d4d167a4bb24c78f4f90d3aa82f
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
