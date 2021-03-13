import {useState, useEffect} from "react";

const SELECT_OPTIONS = "SELECT_OPTIONS";
const IN_Q = "IN_Q";
const ACCEPT_MATCH = "ACCEPT_MATCH";
const LOADING = "LOADING";
const ERROR = "ERROR";

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