import { useState } from "react";

const useSlider = () => {
  const [slider, setSlider] = useState([0, 1000]);
  const handleSliderChange = (event, newVal) => {
    setSlider(newVal);
  };
  const valueText = (slider) => {
    return `₹ ${slider}`;
  };
  return { slider, handleSliderChange, valueText };
};

export default useSlider;