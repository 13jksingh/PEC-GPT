import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const DropMenuGroup = ({
  menuValue,
  menuChangeHandler,
  menuItems,
  menuLabel,
}) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-simple-select-label"> {menuLabel}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={menuValue}
        label={menuLabel}
        onChange={menuChangeHandler}
      >
        {menuItems.map((item,indx) => (
          <MenuItem key={indx} value={item.value}>
            {item.label ? item.label : item.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropMenuGroup;