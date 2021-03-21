import {useState} from "react";

const useEnqueueFlow = function (initial) {
  const [mode, setMode] = useState(initial)

  const goToView = function (newMode) {
    setMode(newMode);
  }

  return {
    mode,
    goToView
  }
};

export default useEnqueueFlow;