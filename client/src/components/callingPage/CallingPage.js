import VideoControls from "components/videoControls/VideoControls";
import "./callingPage.scss";

const CallingPage = ({ show }) => {
  return (
    <div className={`callingPage ${show && "show"}`}>
      <div className="callingPage__callingText">
        Calling
        <span className="callingPage_ball"></span>
        <span className="callingPage_ball second"></span>
        <span className="callingPage_ball third"></span>
      </div>
      <VideoControls hang />
    </div>
  );
};

export default CallingPage;
