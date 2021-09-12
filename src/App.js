import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Contact from "./components/Contact";
import Customer from "./components/Customers/Customer";
import Login from './components/Login/Login';
import CustomerRegister from './components/CustomerRegister/CustomerRegister';
import Chart from "./components/Chart/Chart";
import LandingPage from './components/LandingPage/LandingPage';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/customers">
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
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
