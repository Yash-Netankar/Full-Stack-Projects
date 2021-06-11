import { Switch, Route, NavLink as Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
// components
import Home from "./components/Home";
import Edit from "./components/Edit";
import Create from "./components/Create";

function App() {
  return (
    <>
      {/* navigation bar for every page*/}
      <nav className="main_nav">
        <Link to="/" className="logo">
          <h1>NY-TV</h1>
        </Link>
        <Link to="/addMovie">
          <Button className="add_movie_btn">
            <AddIcon />
          </Button>
        </Link>
      </nav>


      {/* Routes */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/addMovie" component={Create} />
        <Route exact path="/edit/:id" component={Edit} />
      </Switch>
    </>
  );
}

export default App;
