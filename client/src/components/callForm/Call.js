import Alert from "components/alert/Alert";
import { useState, useContext } from "react";
// import { useHistory } from "react-router-dom";
import { SocketContext } from "../../context/SocketContext";
import "./call.scss";

const Call = ({ show, callFunc }) => {
  const { callUser, name, setName, idToCall, setIdToCall } =
    useContext(SocketContext);
  // const [idToCall, setIdToCall] = useState("");
  const [error, setError] = useState(false);

  // const history = useHistory();

  const handleCall = () => {
    if (!idToCall) {
      setError(true);

      setTimeout(() => setError(false), 5000);
    } else {
      setError(false);
      callUser(idToCall);
      callFunc(true);
      // history.push("/video");
    }
  };

  return (
    <div className={`call ${show && "show"}`}>
      {error && <Alert error message="Pls, input an ID" />}
      <div className="call__container">
        <input
          type="text"
          className="call__input"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="call__input"
          placeholder="Recepient's ID"
          value={idToCall}
          onChange={(e) => setIdToCall(e.target.value)}
        />
        <button onClick={handleCall} className="call__btn btn">
          Call
        </button>
      </div>
    </div>
  );
};

export default Call;
