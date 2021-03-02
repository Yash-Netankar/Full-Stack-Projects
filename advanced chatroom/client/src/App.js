import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom";
import PrivateRoom from "./components/PrivateRoom";
import "./styles/sass/main.css";
function App() {
  return (
    <Switch>
      <Route path="/" exact render={() => (<Login />)} />
      <Route path="/chatroom/:name" exact render={() => (<ChatRoom />)} />
      <Route path="/chatroom/privateroom/:name" exact render={() => (<PrivateRoom />)} />
    </Switch>
  );
}

export default App;
