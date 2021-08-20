import Home from "./pages/home/Home";
import { Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Route path="/" component={Home} exact />
    </div>
  );
};

export default App;
