import { useState, useEffect } from "react";
import "./alert.scss";

const Alert = ({ message, success, error }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timer;
    if (message) {
      setShow(true);
      timer = setTimeout(() => {
        setShow(false);
      }, 4000);
    }
    // else {
    //   setShow(false);
    // }
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div
      className={`alert ${show && "show"} ${success && "success"} ${
        error && "error"
      }`}
    >
      <span className="alert__text">{message}</span>
    </div>
  );
};

export default Alert;
