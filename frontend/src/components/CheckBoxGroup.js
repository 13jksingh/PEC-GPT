import { useState } from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

const CheckBoxGroup = ({ state, setState, label, errorText }) => {
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
      required
      error={error}
      component="fieldset"
      sx={{ m: 1 }}
      variant="standard"
    >
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>
        {Object.keys(items).map((k) => (
          <FormControlLabel
            control={
              <Checkbox checked={items[k]} onChange={handleChange} name={k} />
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
