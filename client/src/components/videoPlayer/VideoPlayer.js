import { useContext, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import CopyToClipboard from "react-copy-to-clipboard";
import "./videoPlayer.scss";

const VideoPlayer = () => {
  const {
    call,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    name,
    setName,
    callEnded,
    me,
    callUser,
    leaveCall,
    answerCall,
  } = useContext(SocketContext);

  const state = useContext(SocketContext);

  const [idToCall, setIdToCall] = useState("");
  console.log(state);
  console.log(idToCall);
  return (
    <>
      <div className="video__cont" style={{ display: "flex" }}>
        {stream && (
          <div>
            <h3>{name || "Name"}</h3>
            <video
              muted
              playsInline
              ref={myVideo}
              autoPlay
              style={{ width: "400px" }}
              className="video"
            />
          </div>
        )}
        {callAccepted && !callEnded && (
          <div>
            <h3>{call.name || "Name"}</h3>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              style={{ width: "400px" }}
              className="video"
            />
          </div>
        )}
      </div>
      <div>
        <form
          onSubmit={(e) => e.preventDefault()}
          noValidate
          autoComplete="off"
        >
          <div className="div">
            <h4>Account Info</h4>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <CopyToClipboard text={me}>
              <button>Copy your ID</button>
            </CopyToClipboard>
          </div>
          <div className="div">
            <h4>Make a Call</h4>
            <label>Id to Call</label>
            <input
              type="text"
              value={idToCall}
              onChange={(e) => setIdToCall(e.target.value)}
            />
            {callAccepted && !callEnded ? (
              <button onClick={leaveCall}>Hang Up</button>
            ) : (
              <button onClick={() => callUser(idToCall)}>Call</button>
            )}
          </div>
        </form>
        {call.isReceivedCall && !callAccepted && (
          <>
            <h1>{call.name} is calling</h1>
            <button onClick={answerCall}>Answer</button>
          </>
        )}
      </div>
    </>
  );
};

export default VideoPlayer;
