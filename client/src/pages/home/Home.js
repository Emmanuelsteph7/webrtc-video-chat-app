import { useContext, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import CopyToClipboard from "react-copy-to-clipboard";
import Call from "components/callForm/Call";
import Alert from "components/alert/Alert";
import "./home.scss";
import IncomingCallPage from "components/incomingCallPage/IncomingCallPage";
import Video from "pages/video/Video";
import CallingPage from "components/callingPage/CallingPage";

const Home = () => {
  const { me, call, callAccepted, callEnded } = useContext(SocketContext);
  const [moveUp, setMoveUp] = useState(false);
  const [copy, setCopy] = useState(false);
  const [showCallingPage, setShowCallingPage] = useState(false);

  const handleMovement = () => {
    setMoveUp(!moveUp);
  };

  const handleCopy = () => {
    setCopy(true);

    setTimeout(() => {
      setCopy(false);
    }, 4500);
  };

  let alert;

  if (copy) {
    alert = <Alert success message={copy && "ID copied"} />;
  }

  return (
    <div className="home">
      {alert && alert}
      <div className="home__bg">
        <div className="home__bg1"></div>
        <div className="home__bg2"></div>
        <div className="home__bg3"></div>
        <div className="home__bg4"></div>
        <div className="home__bg5"></div>
        <div className="home__bg1"></div>
      </div>
      <div className={`home__container ${moveUp && "show"}`}>
        <div className={`home__brand ${moveUp && "show"}`}>Eming</div>
        <div className="home__body">
          <h1 className="home__header">
            Make Video calls with your friends and families
          </h1>
          <p className="home__paragraph">
            Simply create an ID and share or input the ID from the recipient and
            call
          </p>
          <div className="home__btnDiv">
            <CopyToClipboard text={me}>
              <button className="home__btn btn first" onClick={handleCopy}>
                Copy your ID
              </button>
            </CopyToClipboard>
            <button className="home__btn btn second" onClick={handleMovement}>
              Make a call
            </button>
          </div>
        </div>
      </div>
      <Call show={moveUp} callFunc={setShowCallingPage} />
      <Video show={callAccepted && !callEnded ? true : false} />
      <CallingPage show={!callAccepted && showCallingPage} />
      <IncomingCallPage
        // videoFunc={setShowVideo}
        show={call.isReceivedCall && !callAccepted ? "show" : ""}
      />
    </div>
  );
};

export default Home;
