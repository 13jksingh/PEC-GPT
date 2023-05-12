import { useState } from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import {useTheme} from "@mui/material"

const CheckBoxGroup = ({ state, setState, label, errorText }) => {
  const theme=useTheme();

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const items = state;
  const error = [items].filter((v) => v).length === 0;

  return (
    <FormControl
      error={error}
      component="fieldset"
      sx={{ m: 1,width:"100%" }}
      variant="standard"
    >
      <FormLabel component="legend" sx={{color:theme.palette.grey[600],textTransform:"uppercase"}}>{label}</FormLabel>
      <FormGroup>
        {Object.keys(items).map((k) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={items[k]}
                onChange={handleChange}
                name={k}
                style={{
                  color: theme.palette.green[300],
                }}
              />
            }
            label={k}
          />
        ))}
      </FormGroup>
      {error && <FormHelperText>{errorText}</FormHelperText>}
    </FormControl>
  );
};

export default CheckBoxGroup;
