import { Switch, Route } from 'react-router-dom';
import './sass/App.scss';
import Home from './pages/home';
import Nav from './components/nav';
import Create from './pages/create';
import Update from './pages/Update';

function App() {
  return (
    <>
      <Nav />
      <Switch>
        <Route path="/" exact render={() => <Home />} />
        <Route path="/create" exact render={() => (<Create />)} />
        <Route path="/update" exact render={() => (<Update />)} />
        <Route path="/update/:id/:name/:email/:phone" exact render={() => (<Update />)} />
      </Switch>
    </>
  );
}

export default App;
