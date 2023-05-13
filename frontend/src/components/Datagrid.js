import React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import { useProSidebar } from "react-pro-sidebar";

const Datagrid = ({ data, columns }) => {
  const theme = useTheme();
  const colors = theme.palette;
  const { collapsed } = useProSidebar();

  return (
    <Box
      m="40px 0 0 0"
      maxWidth={collapsed ? "100rem" : "90rem"}
      sx={{
        overflowX: "scroll",
        overflowY: "scroll",
        "& .MuiDataGrid-root": {
          border: "1px",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
          backgroundColor: "#fff",
        },
        "& .name-column--cell": {
          color: colors.green[900],
        },
        "& .status-column--cell": {
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
        rows={data}
        columns={columns}
        components={{ Toolbar: GridToolbar }} // this property is user to filter the data
        getRowId={(i) => i.dataID}
      />
    </Box>
  );
};

export default Datagrid;
