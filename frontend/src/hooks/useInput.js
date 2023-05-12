import { useState } from "react";

const useTextInput = (initialValue, validate, errorText) => {
  const [val, setVal] = useState(initialValue);
  const [touched, setTouched] = useState(false);

  const valChange = (event) => {
    setVal(event.target.value);
  };

  const valBlur = (event) => {
    if (val === undefined || null) setVal("");
    setTouched(true);
  };

  const valReset = () => {
    setVal(initialValue);
    setTouched(false);
  };

  //see error to be put in TextField class
  let valError = false;
  touched && !validate(val) ? (valError = true) : (valError = false);

  let errortext = "";
  if (valError) errortext = errorText;

  return {
    val,
    valChange,
    valBlur,
    valReset,
    valError,
    touched,
    errortext,
  };
};

export default useTextInput;