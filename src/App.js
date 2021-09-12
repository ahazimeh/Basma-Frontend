import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Contact from "./components/Contact";
import Customer from "./components/Customers/Customer";
import Login from './components/Login/Login';
import CustomerRegister from './components/CustomerRegister/CustomerRegister';
import Chart from "./components/Chart/Chart";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Customer />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <CustomerRegister />
        </Route>
        <Route path="/chart">
          <Chart />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
