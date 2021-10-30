import {BrowserRouter as Router, Switch,Route } from "react-router-dom"
import AuthProvider from "../context/AuthContext";
import Dashboard from "./Dashboard"
import PrivateRoute from "./PrivateRoute";
import Signup from "./Signup"
import Login from "./Login"
function App() {
  
  return (
    <Router>
      <AuthProvider>
        <Switch>
            <PrivateRoute exact path="/" component={Dashboard}  redirect="/signup" type={true}/>
            <PrivateRoute path="/signup" component={Signup} redirect="/" type={false}/>
            <PrivateRoute path="/login" component={Login} redirect="/" type={false}/>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
