import Video from "pages/video/Video";
import VideoPlayer from "./components/videoPlayer/VideoPlayer";
import Home from "./pages/home/Home";
import { Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      {/* <VideoPlayer /> */}
      {/* <Home /> */}
      <Route path="/" component={Home} exact />
      <Route path="/video" component={Video} />
    </div>
  );
};

export default App;
