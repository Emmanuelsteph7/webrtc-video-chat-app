import VideoControls from "components/videoControls/VideoControls";
import { useContext } from "react";
import { SocketContext } from "../../context/SocketContext";
import "./incomingCallPage.scss";

const IncomingCallPage = ({ show, videoFunc }) => {
  const { call } = useContext(SocketContext);

  return (
    <div className={`incomingCallPage ${show && "show"}`}>
      <div className="incomingCallPage__incomingCallText">
        Incoming Call
        <span className="incomingCallPage_ball"></span>
        <span className="incomingCallPage_ball second"></span>
        <span className="incomingCallPage_ball third"></span>
      </div>
      <div className="incomingCallPage__incomingCallName">
        {call.name ? call.name : "No name"}
      </div>
      <VideoControls incomingCall />
    </div>
  );
};

export default IncomingCallPage;
