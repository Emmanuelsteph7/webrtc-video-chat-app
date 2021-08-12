import { SocketContext } from "../../context/SocketContext";
import "./videoPlayer.scss";

const VideoPlayer = () => {
  return (
    <div>
      <div>
        <video muted playsInline ref={null} autoPlay className="video" />
      </div>
      <div>
        <video playsInline ref={null} autoPlay className="video" />
      </div>
    </div>
  );
};

export default VideoPlayer;
