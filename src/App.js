import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import CustomerList from "./components/CustomerList";
import CustomerDetails from "./components/CustomerDetails";
import CustomerForm from "./components/CustomerForm";
import EditCustomerForm from "./components/EditCustomerForm";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/customers/new" component={CustomerForm} />
        <Route path="/customers/edit/:id" component={EditCustomerForm} />
        <Route path="/customers/:id" component={CustomerDetails} />
        <Route path="/customers" component={CustomerList} />
        <Route path="/about" component={About} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
