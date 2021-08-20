import VideoControls from "components/videoControls/VideoControls";
import { useEffect } from "react";
import { useContext } from "react";
import { SocketContext } from "../../context/SocketContext";
import CallingPage from "components/callingPage/CallingPage";
import IncomingCallPage from "components/incomingCallPage/IncomingCallPage";
import "./video.scss";

const Video = ({ show }) => {
  const {
    stream,
    myVideo,
    userVideo,
    callAccepted,
    callEnded,
    call,
    idToCall,
    callUser,
    clickAnswer,
    setClickAnswer,
    answerCall,
  } = useContext(SocketContext);

  useEffect(() => {
    if (idToCall) {
      callUser(idToCall);
    }

    if (clickAnswer) {
      answerCall();
      setClickAnswer(false);
    }
  }, []);

  return (
    <div className={`video ${show && "show"}`}>
      <div className="video__container">
        <div className="video__myVideoDiv">
          {callAccepted && !callEnded && (
            <>
              <h2 className="video__header">
                {call.name ? call.name : "Call in Progress"}
              </h2>
              <video
                ref={userVideo}
                playsInline
                autoPlay
                className="video__recepientVideo"
              />
            </>
          )}
          {stream && (
            <>
              <video
                muted
                ref={myVideo}
                playsInline
                autoPlay
                className={`video__myVideo  ${
                  callAccepted && !callEnded ? "shrink" : ""
                }`}
              />
            </>
          )}
          {/* {call.isReceivedCall && !callAccepted && <IncomingCallPage />}
          {!callAccepted && <CallingPage />} */}
        </div>
        <VideoControls />
      </div>
    </div>
  );
};

export default Video;
