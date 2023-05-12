import { useState } from "react";

const useSlider = (low,high) => {
  const [slider, setSlider] = useState([low || 0, high || 100]);
  const handleSliderChange = (event, newVal) => {
    setSlider(newVal);
  };

  return { slider, handleSliderChange };
};

export default useSlider;