import { useContext } from "react";
import { ImPhoneHangUp } from "react-icons/im";
import { MdCall } from "react-icons/md";
import { SocketContext } from "../../context/SocketContext";
import "./videoControls.scss";

const VideoControls = ({ hang, answer, videoFunc, incomingCall }) => {
  const { leaveCall, answerCall } = useContext(SocketContext);

  const handleAnswer = () => {
    answerCall();
  };

  const handleHang = () => {
    leaveCall();
    window.location.reload();
  };

  return (
    <>
      {hang ? (
        <div className="controls">
          <button className="controls__hangUp" onClick={handleHang}>
            <ImPhoneHangUp />
          </button>
        </div>
      ) : answer ? (
        <div className="controls">
          <button className="controls__answer" onClick={handleAnswer}>
            <MdCall />
          </button>
        </div>
      ) : incomingCall ? (
        <div className="controls incomingCall">
          <button className="controls__answer" onClick={handleAnswer}>
            <MdCall />
          </button>
          <button className="controls__hangUp" onClick={handleHang}>
            <ImPhoneHangUp />
          </button>
        </div>
      ) : (
        <div className="controls videoPage">
          <button className="controls__hangUp" onClick={handleHang}>
            <ImPhoneHangUp />
          </button>
        </div>
      )}
    </>
  );
};

export default VideoControls;
