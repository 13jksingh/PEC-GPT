import React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";

const Datagrid = ({data}) => {
  const theme = useTheme();
  const colors = theme.palette;
  return (
    <Box
      m="40px 0 0 0"
      height="80vh"
      width="150vh"
      sx={{
        "& .MuiDataGrid-root": {
          border: "1px",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
          backgroundColor: colors.black[100]
        },
        "& .name-column--cell": {
          color: colors.green[900],
        },
        "& .status-column--cell":{
          color: colors.red[700],
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.blue[200],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.grey[400],
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: colors.blue[200],
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${colors.black[900]} !important`,
        },
      }}
    >
      <DataGrid
        rows={data.slice(1)}
        columns={data[0]}
        components={{ Toolbar: GridToolbar }} // this property is user to filter the data
        getRowId={(i)=>i.order_id}
      />
    </Box>
  );
};

export default Datagrid;